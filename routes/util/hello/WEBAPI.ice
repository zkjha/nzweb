/************************************************************************/
/*CopyRight:	NAZHIAI Tech											*/
/*FileName:		WEBAPI.ice						  						*/
/*Describe:		This file define the interface between web and server	*/
/*Author:		Cliff Chen												*/
/*date:			2017.10.17												*/
/*version:		0.10													*/
/************************************************************************/

#pragma once
module WebAPI
{

    /**
     * @brief  后台管理员信息。
     */
struct Account
{
    /**
     * @brief  用户名。
     */
	string usernam;
    /**
     * @brief  密码。
     */
	string password;
    /**
     * @brief  权限。
     */
	int authority;
    /**
     * @brief  id号。
     */
	int userid;
};

/**
 * @brief  后端接口返回给前端的单个管理员数据。
 */
struct AcntRslt
{
    /**
     * @brief  后台操作的状态码，表示成功或者因为什么原因失败。
     */
	int code;
    /**
     * @brief  管理员id。
     */
	int userid;
    /**
     * @brief 模式选择。未使用，不用管。
     */
	int bgmodel;
    /**
     * @brief  权限。
     */
	int authority;
};

sequence<Account> AcntList; /*user account list*/

/**
 * @brief  cms界面查询管理员列表时，返回给前台的管理员信息。
 */
struct AcntListRlt
{
    /**
     * @brief  后台操作的状态码，表示成功或者因为什么原因失败。
     */
	int code;
    /**
     * @brief  管理员列表。
     */
	AcntList rslt;
};

/**
 * @brief  相机信息。
 */
struct CamInfo /*camera info*/
{
    /**
     * @brief  相机名称。比如“二楼摄像头”。
     */
	string name;
    /**
     * @brief  ip
     */
	string CamIp;
    /**
     * @brief  id。
     */
	int	camid;
    /**
     * @brief  相机密码。FIXME 这个什么意思？
     */
	string campassword;
    /**
     * @brief  相机安装在什么地方。
     */
	string camaddress;
    /**
     * @brief  摄像头状态。
     *         1为开启，0为关闭。若调用查询摄像头列表时，此字段为-1，表示查询所有摄像头。
     */
	int camst;
    /**
     * @brief  FIXME 什么意思
     */
	int rsltnum;
};

sequence<CamInfo> CamsList; /*The cameras have been registed*/

/**
 * @brief  cms查询后台时，返回给前端的数据。
 */
struct CamsListRlt
{
    /**
     * @brief  错误码。表示成功或者什么原因失败。
     */
	int code;
    /**
     * @brief  相机列表。
     */
	CamsList listrslt;
};

/**
 * @brief  查询
 */
struct ChkRslt
{
    /**
     * @brief  相机id。
     */
	int camid;
    /**
     * @brief  图片查看地址。
     */
	string pic;
    /**
     * @brief  人名。
     */
	string pname;
    /**
     * @brief  人的分类。0表示员工，1表示管理员，2表示访客，3表示陌生人。
     */
	int persontype;
    /**
     * @brief  FIXME 什么意思
     */
	int event;
};

sequence<ChkRslt> RsltList;

/**
 * @brief  
 */
struct CamST
{
    /**
     * @brief  状态码。
     */
	int code;
    /**
     * @brief  FIXME 什么意思
     */
	int rsltnum;

    /**
     * @brief  FIXME 什么意思
     */
	RsltList rsltlist;
};

sequence<byte> FileUpload;
/**
 * @brief  
 */
struct FileInfo
{	
    /**
     * @brief  图片数据。
     */
	FileUpload pic;
    /**
     * @brief  FIXME 什么意思
     */
	int filetype;
    /**
     * @brief  人的分类。0表示员工，1表示管理员，2表示访客，3表示陌生人。
     */
	int persontype;
    /**
     * @brief  人名。
     */
	string name;
    /**
     * @brief  性别。
     */
	int sex;
    /**
     * @brief  生日，FIXME 格式。
     */
	string birthday;
    /**
     * @brief  身份证号。
     */
	string IDNum;
    /**
     * @brief  工号。
     */
	string jobnum;
    /**
     * @brief  访问日期或入职日期，年月日
     */
	string comingday;
    /**
     * @brief  访问时间，时分秒
     */
	string comingtime;
    /**
     * @brief  指示白名单或黑名单
     */
	int group;
    /**
     * @brief  公司名。
     */
	int company;
    /**
     * @brief  城市
     */
	string city;
    /**
     * @brief  工位（包含楼号等信息）
     */
	string addr;
    /**
     * @brief  职位
     */
	int position;
    /**
     * @brief  考勤规则表的id。
     */
	int attendance;
    /**
     * @brief  部门id。
     */
	int department;
};

/**
 * @brief  人的信息。
 */
struct PersonInfo
{
    /**
     * @brief  人的分类。0表示员工，1表示管理员，2表示访客，3表示陌生人。
     */
	int type;
    /**
     * @brief  人在数据表中的id。
     */
	int personid;
    /**
     * @brief  人名
     */
	string pname;
    /**
     * @brief  性别。
     */
	int gender;
    /**
     * @brief  生日。FIXME 格式
     */
	string birth;
    /**
     * @brief  身份证号。
     */
	string IDNum;
    /**
     * @brief  工号。
     */
	string employeenum;
    /**
     * @brief  TODO 什么意思
     */
	string entrytime;
    /**
     * @brief  图片路径
     */
	string picdirect;
    /**
     * @brief  FIXME 什么意思
     */
	string entrydate;
    /**
     * @brief  指示白名单或黑名单
     */
	int group;
    /**
     * @brief  公司名。
     */
	string company;
    /**
     * @brief  城市。
     */
	string city;
    /**
     * @brief  工位（包含楼号等信息）
     */
	string addr;
    /**
     * @brief  职位
     */
	string position;
    /**
     * @brief  考勤规则名。
     */
	string attendancerule;
    /**
     * @brief  部门名。
     */
	string department;
    /**
     * @brief  公司id。
     */
	int companyid;
    /**
     * @brief  职位id。
     */
	int positionid;
    /**
     * @brief  考勤规则id。
     */
	int attendanceid;
    /**
     * @brief  部门id。
     */
	int departmentid;
};

/**
 * @brief  员工信息列表。
 */
sequence<PersonInfo> PerInfoList;

/**
 * @brief  包含id和type。type表示人员类型，包括员工、管理层、访客和陌生人。
 *         不同类型的人员保存在不同的数据表中，id表示各个表中的id。
 */
struct PersonIdType
{
    /**
     * @brief  数据表中的id。
     */
    int personId;
    /**
     * @brief  人员类型，可确定人员所在的数据表。
     */
    int personType;
};

/**
 * @brief  用于根据员工id，修改员工信息的接口。
 */
struct Mpic
{
    /**
     * @brief  人员在数据表中的id。
     */
	int persoind;
    /**
     * @brief  人员类型，可确定人员所在的数据表。
     */
    int personType;
    /**
     * @brief  员工信息。
     */
	FileUpload newpic;
};

/**
 * @brief  员工信息接口的返回结果。
 */
struct PeoST
{
    /**
     * @brief  后台操作的状态码，表示成功或者因为什么原因失败。
     */
	int code;
    /**
     * @brief  人员信息列表。
     */
	PerInfoList infolist;
};

/**
 * @brief  查询打卡记录的输入。
 */
struct HisInfo
{
    /**
     * @brief  人名。
     */
	string name;
    /**
     * @brief  工号。
     */
	string employeenum;
    /**
     * @brief  身份证号。
     */
	string IDNum;
    /**
     * @brief  指示白名单或黑名单
     */
	int group;
    /**
     * @brief  人的分类。0表示员工，1表示管理员，2表示访客，3表示陌生人。
     */
	int type;
    /**
     * @brief  查询的起始时间。
     */
	string starttime;
    /**
     * @brief  查询的结束时间。
     */
	string endtime;
    /**
     * @brief  人的id。
     */
	int personid;
    /**
     * @brief  第多少页。前端如果不传这个值，后台收到的数据是-1。后台发现这个值<1时，使用默认的1，即展示第1页。
     */
	int pageNum;
    /**
     * @brief  每页多少条记录。前端如果不传这个值，后台收到的数据是-1，后台则使用默认的10。
     */
	int pageSize;
	//string department;
};

/**
 * @brief  查询打卡记录的返回。
 */
struct HisAcrd
{
    /**
     * @brief  记录表的id。
     */
	int hisid;
    /**
     * @brief  图片地址。
     */
	string pic;
    /**
     * @brief  人名。
     */
	string name;
    /**
     * @brief  工号。
     */
	string employeenum;
    /**
     * @brief  身份证号。
     */
	string IDNum;
    /**
     * @brief  指示白名单或黑名单
     */
	int group;
    /**
     * @brief  人的分类。0表示员工，1表示管理员，2表示访客，3表示陌生人。
     */
	int type;
    /**
     * @brief  性别。
     */
	int gender;
    /**
     * @brief  打卡的日期。
     */
	string acrddate;
    /**
     * @brief  打卡的时间。
     */
	string acrdtime;
    /**
     * @brief  相机名称。
     */
	string camname;
    /**
     * @brief  人的id。
     */
	int personid;
    /**
     * @brief  图片id。
     */
	int picid;
    /**
     * @brief  相机id。
     */
	int camid;
};
sequence<HisAcrd> Accords;

/**
 * @brief  查询打卡记录的返回结果。
 */
struct AcrdQueryRslt
{
    /**
     * @brief  后台操作的错误码。
     */
	int code;
    /**
     * @brief  第多少页。前端如果不传这个值，后台收到的数据是-1。后台发现这个值<1时，使用默认的1，即展示第1页。
     */
	int pageNum;
    /**
     * @brief  每页多少条数据。前端如果不传这个值，后台收到的数据是-1，后台则使用默认的10。
     *
     */
	int pageSize;
    /**
     * @brief  总共多少条数据。用于给前端计算一共多少页。
     */
	int totalCount;
    /**
     * @brief  打卡记录的数组。
     */
	Accords hisacrds;
};

/**
 * @brief  用于设置历史记录中的人到黑白名单。
 */
struct GroupModefy
{
	int hisid;
	int group;
};


/**
 * @brief  公司信息。
 */
struct CompInfo
{
	int companyid;
	string name;
};
sequence<CompInfo> CompanyNames;
struct OperST
{
	int code;
	CompanyNames comp;
};

/**
 * @brief  部门信息。
 */
struct DeptInfo
{
	int departmentid;
	string name;
};
sequence<DeptInfo> DeptNams;
struct DeptST
{
	int code;
	DeptNams dept;
};

/**
 * @brief  职位信息。
 */
struct PositInfo
{
	int positionid;
	string name;
};
sequence<PositInfo> PositNams;
struct PositST
{
	int code;
	PositNams posit;
};

/**
 * @brief  签到规则。
 */
struct AttendRuleInfo
{
    /**
     * @brief  规则在数据表中的id。
     */
	int ruleid;
    /**
     * @brief  规则名字。
     */
	string rulename;
    /**
     * @brief  最早签到时间。
     */
	string alcheckin;
    /**
     * @brief  最晚签到时间。
     */
	string checkin;
    /**
     * @brief  最早签退时间。
     */
	string checkout;
    /**
     * @brief  最晚签退时间。
     */
	string lacheckout;
    /**
     * @brief  中午排除时间。
     */
	double mealtime;
    /**
     * @brief  要求工作时长。
     */
	double worktime;
};
sequence<AttendRuleInfo> RuleList;
struct AttRuleSt
{
	int code;
	RuleList rulelist;
};


/**
 * @brief  签到查询的输入。
 */
struct AAQueryInfo
{
    /**
     * @brief  人名。
     */
	string name;
    /**
     * @brief  工号。
     */
	string employeenum;
    /**
     * @brief  部门编号。
     */
	int department;
    /**
     * @brief  查询起始时间。
     */
	string starttime;
    /**
     * @brief  查询结束时间。
     */
	string endtime;
    /**
     * @brief  第多少页。
     */
	int pageNum;
    /**
     * @brief  每页多少条记录。
     */
	int pageSize;
};

/**
 * @brief  单个签到情况的数据结构。
 */
struct AAQRslt
{
    /**
     * @brief  日期。
     */
	string date;
    /**
     * @brief  人名。
     */
	string name;
    /**
     * @brief  工号。
     */
	string employeenum;
    /**
     * @brief  部门名。
     */
	string department;
    /**
     * @brief  签到时间。
     */
	string checkin;
    /**
     * @brief  签退时间。
     */
	string checkout;
    /**
     * @brief  考勤规则名。
     */
	string attendrule;
    /**
     * @brief  考勤结果。
     */
	int attendresult;
};
sequence<AAQRslt> AAQList;

/**
 * @brief  签到查询的返回。
 */
struct AAST
{
    /**
     * @brief  错误码。
     */
	int code;
    /**
     * @brief  FIXME 什么意思？
     */
	int AttendCounter;
    /**
     * @brief  第多少页。
     */
	int pageNum;
    /**
     * @brief  每页多少条记录。
     */
	int pageSize;
    /**
     * @brief  一共多少条记录。
     */
	int totalCount;
    /**
     * @brief  签到记录的列表。
     */
	AAQList aaqlist;
};

/**
 * @brief  迎宾语。
 */
struct WWInfo
{
    /**
     * @brief  人的分类。0表示员工，1表示管理员，2表示访客，3表示陌生人。
     */
	int type;
    /**
     * @brief  迎宾语内容。
     */
	string welcword;
    /**
     * @brief  数据表中的id。
     */
	int weleordid;
};
sequence<WWInfo> WWlist;

/**
 * @brief  迎宾语结构。
 */
struct WWST
{
    /**
     * @brief  状态码。
     */
	int code;
    /**
     * @brief  迎宾语列表。
     */
	WWlist welcowords;
};

/**
 * @brief  会议参会人员。
 */
struct ConferenceAttendee
{
    string name;
    FileUpload photo;
};

sequence<ConferenceAttendee> SeqConfAttendee;

interface FaceShow
{
	/*User Account Management*/
    /**
     * @brief  AccountCheck FIXME
     *
     * @param UserAcnt
     * @param rslt 返回结果。FIXME 这个结果怎么用？
     */
	void AccountCheck(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountAdd 添加管理员账户。
     *
     * @param UserAcnt 添加的账户信息。
     * @param rslt 返回结果。
     */
	void AccountAdd(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountDelete 删除管理员。
     *
     * @param UserAcnt 要删除的管理员信息。
     * @param rslt 返回结果。
     */
	void AccountDelete(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountModefy 修改管理员。
     *
     * @param UserAcnt 管理员信息。
     * @param rslt 返回结果。
     */
	void AccountModefy(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountQuery 查询管理员。
     *
     * @param listrlt 返回管理员列表信息。
     */
	void AccountQuery(out AcntListRlt listrlt);

	/*Camera Management*/
    /**
     * @brief  CamAdd 添加摄像头。
     *
     * @param caminfo 摄像头信息。
     * @param rslt 返回结果。
     */
	void CamAdd(CamInfo caminfo, out CamsListRlt rslt);
    /**
     * @brief  CamDelete 删除摄像头信息。
     *
     * @param caminfo 摄像头信息。
     * @param rslt 返回结果。
     */
	void CamDelete(CamInfo caminfo, out CamsListRlt rslt);
    /**
     * @brief  CamModefy 修改摄像头信息。
     *
     * @param Newcam 摄像头信息。通过id定位摄像头，然后修改里面的其它字段。
     * @param rslt 返回结果。
     */
	void CamModefy(CamInfo Newcam, out CamsListRlt rslt);
    /**
     * @brief  CamQuery 根据caminfo.camst查询摄像头列表。
     *
     * @param caminfo caminfo.camst字段为1时表示查询开启的摄像头，为0时表示查询关闭的摄像头，为-1时表示查询所有摄像头。
     * @param rslt 返回结果。
     */
	void CamQuery(CamInfo caminfo,out CamsListRlt rslt);
    /**
     * @brief  SigCamQuery 根据caminfo.id查询单个摄像头。
     *
     * @param caminfo 包含摄像头id。
     * @param rslt 返回结果。
     */
	void SigCamQuery(CamInfo caminfo, out CamsListRlt rslt);

	/*Face Recognize*/
    /**
     * @brief  ChkCamStart 通过摄像头id开启摄像头。
     *
     * @param caminfo 包含摄像头id。
     * @param camst 返回结果。
     */
	void ChkCamStart(CamInfo caminfo,out CamST camst);
    /**
     * @brief  ChkRsltQuery 根据摄像头id，获取考勤和迎宾的记录，供前端实时展示。
     *
     * @param caminfo 包含摄像头id。
     * @param camst 返回结果。
     */
	void ChkRsltQuery(CamInfo caminfo, out CamST camst);
    /**
     * @brief  ChkCamStop 根据摄像头id关闭摄像头。
     *
     * @param caminfo 包含摄像头id。
     * @param camst 返回结果。
     */
	void ChkCamStop(CamInfo caminfo,out CamST camst);

	/*People Information Managment*/
    /**
     * @brief  PicUpload 上传员工信息。
     *
     * @param fileinfo 员工信息。
     * @param code 返回结果。里面包含状态码，0表示成功，其他表示失败。
     */
	void PicUpload(FileInfo fileinfo, out PeoST code);
    /**
     * @brief  PicQuery 根据工号、身份证号、性别、公司名等查找员工信息。
     *
     * @param fileinfo 包含查询条件。
     * @param code 返回员工信息。
     */
	void PicQuery(FileInfo fileinfo, out PeoST code);
    /**
     * @brief  PicDelete 根据personid批量删除员工信息。
     *
     * @param idType id和type
     * @param code 返回结果。里面包含状态码。
     */
	void PicDelete(PersonIdType idType, out PeoST code);
    /**
     * @brief  PicModefy 根据personid修改员工信息。
     *
     * @param mpinfo 里面包含personid。
     * @param code 返回结果。里面包含状态码。
     */
	void PicModefy(PersonInfo mpInfo, out PeoST code);
    /**
     * @brief  PicUpdate 根据员工id更新员工信息。
     *
     * @param mpicinfo 包含员工id和详细信息。
     * @param code 返回结果。里面包含状态码。
     */
	void PicUpdate(Mpic mpicInfo, out PeoST code);

	/*History Record Managment*/
    /**
     * @brief  HistoryQuery 查询历史记录。
     *
     * @param hisinfo 查询条件，
     * @param hisacrd 返回查询的历史记录。
     */
	void HistoryQuery(HisInfo hisinfo, out AcrdQueryRslt hisacrd);
    /**
     * @brief  HistoryDelete 根据历史记录id，删除历史记录。
     *
     * @param hisid 历史记录id。
     * @param hisacrd 返回结果。包含状态码。
     */
	void HistoryDelete(int hisid, out AcrdQueryRslt hisacrd);
    /**
     * @brief  HistoryGroup 根据历史记录id，找到历史记录里的人，设置黑白名单。
     *
     * @param groupm 包含历史记录id和黑白名单字段。
     * @param hisacrd 返回结果。包含状态码。
     */
	void HistoryGroup(GroupModefy groupm, out AcrdQueryRslt hisacrd);

	/*Company Information Managment*/
    /**
     * @brief  CompanyAdd 添加公司信息。
     *
     * @param companyname 公司名。
     * @param opst 返回结果。包含状态码。
     */
	void CompanyAdd(string companyName, out OperST opst);
    /**
     * @brief  CompanyDelete 删除公司。
     *
     * @param companyid 公司id。
     * @param opst 返回结果。包含状态码。
     */
	void CompanyDelete(int companyId, out OperST opst);
    /**
     * @brief  CompanyQuery 查询所有公司。
     *
     * @param opst 包含状态码、公司id和公司名。
     */
	void CompanyQuery(out OperST opst);

	/*Department Information Managment*/
    /**
     * @brief  DeptAdd 添加部门信息。
     *
     * @param deptname 部门名。
     * @param deptst 返回结果。包含状态码。
     */
	void DeptAdd(string deptname, out DeptST deptst);
    /**
     * @brief  DeptDelete 删除部门信息。
     *
     * @param departmentid 部门id。
     * @param deptst 返回结果。包含状态码。
     */
	void DeptDelete(int departmentid, out DeptST deptst);
    /**
     * @brief  DeptQuery 查询所有部门信息。
     *
     * @param deptst 返回结果。包含状态码、部门id和部门名。
     */
	void DeptQuery(out DeptST deptst);

	/*Position Information Managment*/
    /**
     * @brief  PositAdd 添加职位信息。
     *
     * @param positname 职位名。
     * @param positst 返回结果。包含状态码。
     */
	void PositAdd(string positname, out PositST positst);
    /**
     * @brief  PositDelete 删除职位信息。
     *
     * @param positionid 职位id。
     * @param positst 返回结果包含状态码。
     */
	void PositDelete(int positionid, out PositST positst);
    /**
     * @brief  PositQuery 查询职位信息。
     *
     * @param positst 返回状态码、职位id和职位名。
     */
	void PositQuery(out PositST positst);

	/*Attendance Rule Managment*/
    /**
     * @brief  AttendRuleAdd 添加考勤规则。
     *
     * @param ruleinfo 考勤规则。
     * @param rulest 返回结果。包含状态码。
     */
	void AttendRuleAdd(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
    /**
     * @brief  AttnedRuleDelete 删除考勤规则。
     *
     * @param ruleinfo 包含考勤规则id。
     * @param rulest 返回结果，包含状态码。
     */
	void AttnedRuleDelete(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
    /**
     * @brief  AttnedRuleModefy 根据考勤规则id，修改考勤规则。
     *
     * @param ruleinfo 考勤规则信息。
     * @param rulest 返回结果，包含状态码。
     */
	void AttnedRuleModefy(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
    /**
     * @brief  AttnedRuleQuery 查询所有考勤规则。
     *
     * @param ruleinfo 未使用。
     * @param rulest 所有考勤规则信息。
     */
	void AttnedRuleQuery(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
	
	/*Attendance Accord Managment*/
    /**
     * @brief  AttenAccordQuery 根据人名、公司名、时间范围等查询考勤记录。
     *
     * @param aaqinfo 查询条件。
     * @param aaqst 考勤记录列表。
     */
	void AttenAccordQuery(AAQueryInfo aaqinfo, out AAST aaqst);
    /**
     * @brief  AbAttenAccordQuery 根据人名、公司名、时间范围等查询异常的考勤记录。
     *
     * @param aaqinfo 查询条件。
     * @param aaqst 异常的考勤记录。
     */
	void AbAttenAccordQuery(AAQueryInfo aaqinfo, out AAST aaqst);

	/*Welcom Words Management*/
    /**
     * @brief  WelWordAdd 添加迎宾语。
     *
     * @param wwinfo 迎宾语结构。
     * @param wwst 返回结果。包含状态码。
     */
	void WelWordAdd(WWInfo wwinfo, out WWST wwst);
    /**
     * @brief  WelWordQuery 查询所有迎宾语。
     *
     * @param wwst 返回状态码和迎宾语列表。
     */
	void WelWordQuery(out WWST wwst);
    /**
     * @brief  WelWordDelete 根据迎宾语类型删除迎宾语。
     *
     * @param wwinfo 包含迎宾语类型。
     * @param wwst 返回结果。包含状态码。
     */
	void WelWordDelete(WWInfo wwinfo, out WWST wwst);

    /**
     * @brief  AddConference 添加会议。
     *
     * @param confInfo json格式的会议信息。例：
     *                  {"name": "第二次会议", "time": "2017-02-30 10:00:00", "addr": "xx市xx路", "topic": "xxoo"}
     * @param res 成功或失败。例：
     *                  成功 - {"code": 0, "confId": 0}
     *                  失败 - 用户可视 {"code": <非0>, "msg": "相同的会议名字与添加"} 其中code < 300
     *                       - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void AddConference(string confInfo, out string res);

    /**
     * @brief  DelConference 删除会议。
     *
     * @param confId 会议id。
     * @param res 成功或失败。例：
     *                  成功 - {"code": 0}
     *                  失败 - 用户可视 {"code": <非0>, "msg": "会议不存在"} 其中code < 300
     *                       - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void DelConference(int confId, out string res);

    /**
     * @brief  ModConference 修改会议。
     *
     * @param confId 会议id。
     * @param confInfo json格式的会议信息。例：
     *                  {"name": "第二次会议", "time": "2017-02-30 10:00:00", "addr": "xx市xx路", "topic": "xxoo"}
     * @param res 成功或失败。例：
     *                  成功 - {"code": 0}
     *                  失败 - 用户可视 {"code": <非0>, "msg": "会议不存在"} 其中code < 300
     *                       - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void ModConference(int confId, string confInfo, out string res);

    /**
     * @brief  QueryConfInfo 查询所有会议信息。
     *
     * @param res 成功或失败。例：
     *                  成功 - {"code": 0, "info": [{"confId": 3, "name": "第二次会议", "time": ...}]}
     *                  失败 - 用户可视 {"code": <非0>, "msg": "数据库机器无法连接，请查看"} 其中code < 300
     *                       - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void QueryAllConfInfo(out string res);

    /**
     * @brief  AddConfAttendees 添加与会人员。
     *
     * @param confId 会议id。
     * @param attendees 参会人员信息数组。包括图片和人名。
     * @param res 成功或失败。例：
     *                 成功 - {"code": 0}
     *                 失败 - 用户可视 {"code": <非0>, "msg": "会议不存在"} 其中code < 300
     *                      - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void AddConfAttendees(int confId, SeqConfAttendee attendees, out string res);

    /**
     * @brief  DelConfAttendee 删除与会人员。
     *
     * @param confId 会议id。
     * @param attendId 与会人员id。
     * @param res 成功或失败。例：
     *                 成功 - {"code": 0}
     *                 失败 - 用户可视 {"code": <非0>, "msg": "与会人员不存在"} 其中code < 300
     *                      - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void DelConfAttendees(int confId, int attendId, out string res);

    /**
     * @brief  ModConfAttendee 修改与会人员。
     *
     * @param confId 会议id。
     * @param attendId 与会人员id。
     * @param attendee 与会人员信息，包括姓名和照片。
     * @param res 成功或失败。例：
     *                 成功 - {"code": 0}
     *                 失败 - 用户可视 {"code": <非0>, "msg": "与会人员不存在"} 其中code < 300
     *                      - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void ModConfAttendees(int confId, int attendId, ConferenceAttendee attendee, out string res);

    /**
     * @brief  QueryConfInfo 查询单个会议信息和参会人员。
     *
     * @param confId 会议id。
     * @param res 成功或失败。例：
     *                  成功 - {"code": 0, "info": {"confId": 3, "confInfo": {"name": "第二次会议", "time": ..""}, "addtendees": [{"id": 1, "name": "xx", "photo_url": "fdsd"}]}}
     *                  失败 - 用户可视 {"code": <非0>, "msg": "不存在该会议，请确认是否已删除"} 其中code < 300
     *                       - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void QueryConfInfo(int confId, out string res);

    /**
     * @brief  QueryConfAttendingStatus 查询与会人员的到场情况。
     *
     * @param confId 会议id。
     * @param camId 摄像机id。
     * @param count 查询最近多少条数据。-1表示查询所有数据。
     * @param res 成功或失败。例：
     *                 成功 - {"code": 0, "info": {"confId": 3, "confInfo": {...}, "camId": 4, "count": 100, "addtending": ["name": "xx", "photo_url": "xx"... "time": "2017-02-10 15:00:00"]}}
     *                 失败 - 用户可视 {"code": <非0>, "msg": "摄像头无信息，请检查是否故障"} 其中code < 300
     *                      - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void QueryConfAttendingStatus(int confId, int camId, int count, out string res);

    /**
     * @brief  QueryConfAttendeeStatus 查询指定与会人员的到场情况。
     *
     * @param confId 会议id。
     * @param attendId 与会人员id。
     * @param res 成功或失败。例：
     *                 成功 - {"code": 0, "info": {"confId": 3, "confInfo": {...}, "attendId": 10, "name": "xx", "photo_url": "xx"...}}
     *                        如果与会人员到场，info字段里还有    {"status": "present", "time": "2017-02-11 15:00:00", "camId": 1}。
     *                        如果与会人员未到场，info字段里还有  {"status": "absent"}
     *                 失败 - 用户可视 {"code": <非0>, "msg": "没有该与会人员"} 其中code < 300
     *                      - 用户不可视 {"code": <非0>, "msg": "debug信息"} 其中code >= 300
     */
    void QueryConfAttendeeStatus(int confId, int attendId, out string res);

    /**
     * @brief  shutdown 关闭程序。
     */
	void shutdown();
};

};
