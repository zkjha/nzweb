// **********************************************************************
//
// Copyright (c) 2003-2016 ZeroC, Inc. All rights reserved.
//
// **********************************************************************

#pragma once

module Demo
{
struct userprx
{
	string usernam;
	string password;
};
interface Hello
{
 //   idempotent userprx sayHello(userprx delay, out userprx back);
  userprx sayHello(userprx delay, out userprx back);
  void shutdown();
};

};

