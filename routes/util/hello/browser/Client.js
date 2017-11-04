// **********************************************************************
//
// Copyright (c) 2003-2016 ZeroC, Inc. All rights reserved.
//
// **********************************************************************

(function(){

var communicator = Ice.initialize();

var flushEnabled = false;
var batch = 0;
var helloPrx = null;

//
// Create the hello proxy.
//
function updateProxy()
{
    // var hostname = document.location.hostname || "127.0.0.1";
    var hostname = document.location.hostname || "192.168.2.220";
    var proxy = communicator.stringToProxy("hello" +
                                           ":ws -h " + hostname + " -p 8080 -r /demows" +
                                           ":wss -h " + hostname + " -p 9090 -r /demowss");

    //
    // Set or clear the timeout.
    //
    var timeout = $("#timeout").val();
    proxy = proxy.ice_invocationTimeout(timeout > 0 ? timeout : -1);

    //
    // Set the mode and protocol
    //
    var mode = $("#mode").val();
    if(mode == "twoway")
    {
        proxy = proxy.ice_twoway();
    }
    else if(mode == "twoway-secure")
    {
        proxy = proxy.ice_twoway().ice_secure(true);
    }
    else if(mode == "oneway")
    {
        proxy = proxy.ice_oneway();
    }
    else if(mode == "oneway-secure")
    {
        proxy = proxy.ice_oneway().ice_secure(true);
    }
    else if(mode == "oneway-batch")
    {
        proxy = proxy.ice_batchOneway();
    }
    else if(mode == "oneway-batch-secure")
    {
        proxy = proxy.ice_batchOneway().ice_secure(true);
    }
    helloPrx = Demo.HelloPrx.uncheckedCast(proxy);

    //
    // The batch requests associated to the proxy are lost when we
    // update the proxy.
    //
    batch = 0;
    $("#flush").addClass("disabled").off("click");
}

//
// Invoke sayHello.
//
function sayHello()
{
    setState(State.SendRequest);

    if(helloPrx.ice_isBatchOneway())
    {
        batch++;
    }

    return helloPrx.sayHello($("#delay").val());
}

//
// Flush batch requests.
//
function flush()
{
    batch = 0;
    setState(State.FlushBatchRequests);
    return helloPrx.ice_flushBatchRequests();
}

//
// Shutdown the server.
//
function shutdown()
{
    setState(State.SendRequest);

    if(helloPrx.ice_isBatchOneway())
    {
        batch++;
    }

    return helloPrx.shutdown();
}

//
// Return an event handler suitable for "click" methods. The
// event handler calls the given function, handles exceptions
// and resets the state to Idle when the promise returned by
// the function is fulfilled.
//
var performEventHandler = function(fn)
{
    return function()
    {
        Ice.Promise.try(
            function()
            {
                return fn.call();
            }
        ).exception(
            function(ex)
            {
                $("#output").val(ex.toString());
            }
        ).finally(
            function()
            {
                setState(State.Idle);
            }
        );
        return false;
    };
};
var sayHelloClickHandler = performEventHandler(sayHello);
var shutdownClickHandler = performEventHandler(shutdown);
var flushClickHandler = performEventHandler(flush);

//
// Handle the client state.
//
var State = {
    Idle:0,
    SendRequest:1,
    FlushBatchRequests:2
};

var state;

function setState(newState, ex)
{
    function assert(v)
    {
        if(!v)
        {
            throw new Error("Assertion failed");
        }
    }

    if(state === newState)
    {
        //
        // This event was queued before the event handler has time
        // to disable the button, just ignore it.
        //
        return;
    }

    switch(newState)
    {
        case State.Idle:
        {
            assert(state === undefined || state === State.SendRequest || state === State.FlushBatchRequests);

            //
            // Hide the progress indicator.
            //
            $("#progress").hide();
            $("body").removeClass("waiting");

            //
            // Enable buttons.
            //
            $("#hello").removeClass("disabled").click(sayHelloClickHandler);
            $("#shutdown").removeClass("disabled").click(shutdownClickHandler);
            if(batch > 0)
            {
                $("#flush").removeClass("disabled").click(flushClickHandler);
            }
            break;
        }
        case State.SendRequest:
        case State.FlushBatchRequests:
        {
            assert(state === State.Idle);

            //
            // Reset the output.
            //
            $("#output").val("");

            //
            // Disable buttons.
            //
            $("#hello").addClass("disabled").off("click");
            $("#shutdown").addClass("disabled").off("click");
            $("#flush").addClass("disabled").off("click");

            //
            // Display the progress indicator and set the wait cursor.
            //
            $("#progress .message").text(
                newState === State.SendRequest ? "Sending Request..." : "Flush Batch Requests...");
            $("#progress").show();
            $("body").addClass("waiting");
            break;
        }
    }
    state = newState;
}

//
// Start in the idle state
//
setState(State.Idle);

//
// Extract the url GET variables and put them in the _GET object.
//
var _GET = {};
if(window.location.search.length > 1)
{
    window.location.search.substr(1).split("&").forEach(
        function(pair)
        {
            pair = pair.split("=");
            if(pair.length > 0)
            {
                _GET[decodeURIComponent(pair[0])] = pair.length > 1 ? decodeURIComponent(pair[1]) : "";
            }
        });
}

//
// If the mode param is set, initialize the mode select box with that value.
//
if(_GET.mode)
{
    $("#mode").val(_GET.mode);
}

//
// If the user selects a secure mode, ensure that the page is loaded over HTTPS
// so the web server SSL certificate is obtained.
//
$("#mode").on("change",
    function(e)
    {
        var newMode = $(this).val();
        var href;
        if(document.location.protocol === "http:" &&
           (newMode === "twoway-secure" || newMode === "oneway-secure" || newMode === "oneway-batch-secure"))
        {
            href = document.location.protocol + "//" + document.location.host +
                        document.location.pathname + "?mode=" + newMode;
            href = href.replace("http", "https");
            href = href.replace("8080", "9090");
            document.location.assign(href);
        }
        else if (document.location.protocol === "https:" &&
           (newMode === "twoway" || newMode === "oneway" || newMode === "oneway-batch"))
        {
            href = document.location.protocol + "//" + document.location.host +
                        document.location.pathname + "?mode=" + newMode;
            href = href.replace("https", "http");
            href = href.replace("9090", "8080");
            document.location.assign(href);
        }
        console.log(newMode);
        updateProxy();
    });

$("#timeout").on("change",
    function(e)
    {
        updateProxy();
    });

updateProxy();
}());
