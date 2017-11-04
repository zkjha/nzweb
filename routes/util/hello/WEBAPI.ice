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
     * @brief  ��̨����Ա��Ϣ��
     */
struct Account
{
    /**
     * @brief  �û�����
     */
	string usernam;
    /**
     * @brief  ���롣
     */
	string password;
    /**
     * @brief  Ȩ�ޡ�
     */
	int authority;
    /**
     * @brief  id�š�
     */
	int userid;
};

/**
 * @brief  ��˽ӿڷ��ظ�ǰ�˵ĵ�������Ա���ݡ�
 */
struct AcntRslt
{
    /**
     * @brief  ��̨������״̬�룬��ʾ�ɹ�������Ϊʲôԭ��ʧ�ܡ�
     */
	int code;
    /**
     * @brief  ����Աid��
     */
	int userid;
    /**
     * @brief ģʽѡ��δʹ�ã����ùܡ�
     */
	int bgmodel;
    /**
     * @brief  Ȩ�ޡ�
     */
	int authority;
};

sequence<Account> AcntList; /*user account list*/

/**
 * @brief  cms�����ѯ����Ա�б�ʱ�����ظ�ǰ̨�Ĺ���Ա��Ϣ��
 */
struct AcntListRlt
{
    /**
     * @brief  ��̨������״̬�룬��ʾ�ɹ�������Ϊʲôԭ��ʧ�ܡ�
     */
	int code;
    /**
     * @brief  ����Ա�б�
     */
	AcntList rslt;
};

/**
 * @brief  �����Ϣ��
 */
struct CamInfo /*camera info*/
{
    /**
     * @brief  ������ơ����硰��¥����ͷ����
     */
	string name;
    /**
     * @brief  ip
     */
	string CamIp;
    /**
     * @brief  id��
     */
	int	camid;
    /**
     * @brief  ������롣FIXME ���ʲô��˼��
     */
	string campassword;
    /**
     * @brief  �����װ��ʲô�ط���
     */
	string camaddress;
    /**
     * @brief  ����ͷ״̬��
     *         1Ϊ������0Ϊ�رա������ò�ѯ����ͷ�б�ʱ�����ֶ�Ϊ-1����ʾ��ѯ��������ͷ��
     */
	int camst;
    /**
     * @brief  FIXME ʲô��˼
     */
	int rsltnum;
};

sequence<CamInfo> CamsList; /*The cameras have been registed*/

/**
 * @brief  cms��ѯ��̨ʱ�����ظ�ǰ�˵����ݡ�
 */
struct CamsListRlt
{
    /**
     * @brief  �����롣��ʾ�ɹ�����ʲôԭ��ʧ�ܡ�
     */
	int code;
    /**
     * @brief  ����б�
     */
	CamsList listrslt;
};

/**
 * @brief  ��ѯ
 */
struct ChkRslt
{
    /**
     * @brief  ���id��
     */
	int camid;
    /**
     * @brief  ͼƬ�鿴��ַ��
     */
	string pic;
    /**
     * @brief  ������
     */
	string pname;
    /**
     * @brief  �˵ķ��ࡣ0��ʾԱ����1��ʾ����Ա��2��ʾ�ÿͣ�3��ʾİ���ˡ�
     */
	int persontype;
    /**
     * @brief  FIXME ʲô��˼
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
     * @brief  ״̬�롣
     */
	int code;
    /**
     * @brief  FIXME ʲô��˼
     */
	int rsltnum;

    /**
     * @brief  FIXME ʲô��˼
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
     * @brief  ͼƬ���ݡ�
     */
	FileUpload pic;
    /**
     * @brief  FIXME ʲô��˼
     */
	int filetype;
    /**
     * @brief  �˵ķ��ࡣ0��ʾԱ����1��ʾ����Ա��2��ʾ�ÿͣ�3��ʾİ���ˡ�
     */
	int persontype;
    /**
     * @brief  ������
     */
	string name;
    /**
     * @brief  �Ա�
     */
	int sex;
    /**
     * @brief  ���գ�FIXME ��ʽ��
     */
	string birthday;
    /**
     * @brief  ���֤�š�
     */
	string IDNum;
    /**
     * @brief  ���š�
     */
	string jobnum;
    /**
     * @brief  �������ڻ���ְ���ڣ�������
     */
	string comingday;
    /**
     * @brief  ����ʱ�䣬ʱ����
     */
	string comingtime;
    /**
     * @brief  ָʾ�������������
     */
	int group;
    /**
     * @brief  ��˾����
     */
	int company;
    /**
     * @brief  ����
     */
	string city;
    /**
     * @brief  ��λ������¥�ŵ���Ϣ��
     */
	string addr;
    /**
     * @brief  ְλ
     */
	int position;
    /**
     * @brief  ���ڹ�����id��
     */
	int attendance;
    /**
     * @brief  ����id��
     */
	int department;
};

/**
 * @brief  �˵���Ϣ��
 */
struct PersonInfo
{
    /**
     * @brief  �˵ķ��ࡣ0��ʾԱ����1��ʾ����Ա��2��ʾ�ÿͣ�3��ʾİ���ˡ�
     */
	int type;
    /**
     * @brief  �������ݱ��е�id��
     */
	int personid;
    /**
     * @brief  ����
     */
	string pname;
    /**
     * @brief  �Ա�
     */
	int gender;
    /**
     * @brief  ���ա�FIXME ��ʽ
     */
	string birth;
    /**
     * @brief  ���֤�š�
     */
	string IDNum;
    /**
     * @brief  ���š�
     */
	string employeenum;
    /**
     * @brief  TODO ʲô��˼
     */
	string entrytime;
    /**
     * @brief  ͼƬ·��
     */
	string picdirect;
    /**
     * @brief  FIXME ʲô��˼
     */
	string entrydate;
    /**
     * @brief  ָʾ�������������
     */
	int group;
    /**
     * @brief  ��˾����
     */
	string company;
    /**
     * @brief  ���С�
     */
	string city;
    /**
     * @brief  ��λ������¥�ŵ���Ϣ��
     */
	string addr;
    /**
     * @brief  ְλ
     */
	string position;
    /**
     * @brief  ���ڹ�������
     */
	string attendancerule;
    /**
     * @brief  ��������
     */
	string department;
    /**
     * @brief  ��˾id��
     */
	int companyid;
    /**
     * @brief  ְλid��
     */
	int positionid;
    /**
     * @brief  ���ڹ���id��
     */
	int attendanceid;
    /**
     * @brief  ����id��
     */
	int departmentid;
};

/**
 * @brief  Ա����Ϣ�б�
 */
sequence<PersonInfo> PerInfoList;

/**
 * @brief  ����id��type��type��ʾ��Ա���ͣ�����Ա��������㡢�ÿͺ�İ���ˡ�
 *         ��ͬ���͵���Ա�����ڲ�ͬ�����ݱ��У�id��ʾ�������е�id��
 */
struct PersonIdType
{
    /**
     * @brief  ���ݱ��е�id��
     */
    int personId;
    /**
     * @brief  ��Ա���ͣ���ȷ����Ա���ڵ����ݱ�
     */
    int personType;
};

/**
 * @brief  ���ڸ���Ա��id���޸�Ա����Ϣ�Ľӿڡ�
 */
struct Mpic
{
    /**
     * @brief  ��Ա�����ݱ��е�id��
     */
	int persoind;
    /**
     * @brief  ��Ա���ͣ���ȷ����Ա���ڵ����ݱ�
     */
    int personType;
    /**
     * @brief  Ա����Ϣ��
     */
	FileUpload newpic;
};

/**
 * @brief  Ա����Ϣ�ӿڵķ��ؽ����
 */
struct PeoST
{
    /**
     * @brief  ��̨������״̬�룬��ʾ�ɹ�������Ϊʲôԭ��ʧ�ܡ�
     */
	int code;
    /**
     * @brief  ��Ա��Ϣ�б�
     */
	PerInfoList infolist;
};

/**
 * @brief  ��ѯ�򿨼�¼�����롣
 */
struct HisInfo
{
    /**
     * @brief  ������
     */
	string name;
    /**
     * @brief  ���š�
     */
	string employeenum;
    /**
     * @brief  ���֤�š�
     */
	string IDNum;
    /**
     * @brief  ָʾ�������������
     */
	int group;
    /**
     * @brief  �˵ķ��ࡣ0��ʾԱ����1��ʾ����Ա��2��ʾ�ÿͣ�3��ʾİ���ˡ�
     */
	int type;
    /**
     * @brief  ��ѯ����ʼʱ�䡣
     */
	string starttime;
    /**
     * @brief  ��ѯ�Ľ���ʱ�䡣
     */
	string endtime;
    /**
     * @brief  �˵�id��
     */
	int personid;
    /**
     * @brief  �ڶ���ҳ��ǰ������������ֵ����̨�յ���������-1����̨�������ֵ<1ʱ��ʹ��Ĭ�ϵ�1����չʾ��1ҳ��
     */
	int pageNum;
    /**
     * @brief  ÿҳ��������¼��ǰ������������ֵ����̨�յ���������-1����̨��ʹ��Ĭ�ϵ�10��
     */
	int pageSize;
	//string department;
};

/**
 * @brief  ��ѯ�򿨼�¼�ķ��ء�
 */
struct HisAcrd
{
    /**
     * @brief  ��¼���id��
     */
	int hisid;
    /**
     * @brief  ͼƬ��ַ��
     */
	string pic;
    /**
     * @brief  ������
     */
	string name;
    /**
     * @brief  ���š�
     */
	string employeenum;
    /**
     * @brief  ���֤�š�
     */
	string IDNum;
    /**
     * @brief  ָʾ�������������
     */
	int group;
    /**
     * @brief  �˵ķ��ࡣ0��ʾԱ����1��ʾ����Ա��2��ʾ�ÿͣ�3��ʾİ���ˡ�
     */
	int type;
    /**
     * @brief  �Ա�
     */
	int gender;
    /**
     * @brief  �򿨵����ڡ�
     */
	string acrddate;
    /**
     * @brief  �򿨵�ʱ�䡣
     */
	string acrdtime;
    /**
     * @brief  ������ơ�
     */
	string camname;
    /**
     * @brief  �˵�id��
     */
	int personid;
    /**
     * @brief  ͼƬid��
     */
	int picid;
    /**
     * @brief  ���id��
     */
	int camid;
};
sequence<HisAcrd> Accords;

/**
 * @brief  ��ѯ�򿨼�¼�ķ��ؽ����
 */
struct AcrdQueryRslt
{
    /**
     * @brief  ��̨�����Ĵ����롣
     */
	int code;
    /**
     * @brief  �ڶ���ҳ��ǰ������������ֵ����̨�յ���������-1����̨�������ֵ<1ʱ��ʹ��Ĭ�ϵ�1����չʾ��1ҳ��
     */
	int pageNum;
    /**
     * @brief  ÿҳ���������ݡ�ǰ������������ֵ����̨�յ���������-1����̨��ʹ��Ĭ�ϵ�10��
     *
     */
	int pageSize;
    /**
     * @brief  �ܹ����������ݡ����ڸ�ǰ�˼���һ������ҳ��
     */
	int totalCount;
    /**
     * @brief  �򿨼�¼�����顣
     */
	Accords hisacrds;
};

/**
 * @brief  ����������ʷ��¼�е��˵��ڰ�������
 */
struct GroupModefy
{
	int hisid;
	int group;
};


/**
 * @brief  ��˾��Ϣ��
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
 * @brief  ������Ϣ��
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
 * @brief  ְλ��Ϣ��
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
 * @brief  ǩ������
 */
struct AttendRuleInfo
{
    /**
     * @brief  ���������ݱ��е�id��
     */
	int ruleid;
    /**
     * @brief  �������֡�
     */
	string rulename;
    /**
     * @brief  ����ǩ��ʱ�䡣
     */
	string alcheckin;
    /**
     * @brief  ����ǩ��ʱ�䡣
     */
	string checkin;
    /**
     * @brief  ����ǩ��ʱ�䡣
     */
	string checkout;
    /**
     * @brief  ����ǩ��ʱ�䡣
     */
	string lacheckout;
    /**
     * @brief  �����ų�ʱ�䡣
     */
	double mealtime;
    /**
     * @brief  Ҫ����ʱ����
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
 * @brief  ǩ����ѯ�����롣
 */
struct AAQueryInfo
{
    /**
     * @brief  ������
     */
	string name;
    /**
     * @brief  ���š�
     */
	string employeenum;
    /**
     * @brief  ���ű�š�
     */
	int department;
    /**
     * @brief  ��ѯ��ʼʱ�䡣
     */
	string starttime;
    /**
     * @brief  ��ѯ����ʱ�䡣
     */
	string endtime;
    /**
     * @brief  �ڶ���ҳ��
     */
	int pageNum;
    /**
     * @brief  ÿҳ��������¼��
     */
	int pageSize;
};

/**
 * @brief  ����ǩ����������ݽṹ��
 */
struct AAQRslt
{
    /**
     * @brief  ���ڡ�
     */
	string date;
    /**
     * @brief  ������
     */
	string name;
    /**
     * @brief  ���š�
     */
	string employeenum;
    /**
     * @brief  ��������
     */
	string department;
    /**
     * @brief  ǩ��ʱ�䡣
     */
	string checkin;
    /**
     * @brief  ǩ��ʱ�䡣
     */
	string checkout;
    /**
     * @brief  ���ڹ�������
     */
	string attendrule;
    /**
     * @brief  ���ڽ����
     */
	int attendresult;
};
sequence<AAQRslt> AAQList;

/**
 * @brief  ǩ����ѯ�ķ��ء�
 */
struct AAST
{
    /**
     * @brief  �����롣
     */
	int code;
    /**
     * @brief  FIXME ʲô��˼��
     */
	int AttendCounter;
    /**
     * @brief  �ڶ���ҳ��
     */
	int pageNum;
    /**
     * @brief  ÿҳ��������¼��
     */
	int pageSize;
    /**
     * @brief  һ����������¼��
     */
	int totalCount;
    /**
     * @brief  ǩ����¼���б�
     */
	AAQList aaqlist;
};

/**
 * @brief  ӭ���
 */
struct WWInfo
{
    /**
     * @brief  �˵ķ��ࡣ0��ʾԱ����1��ʾ����Ա��2��ʾ�ÿͣ�3��ʾİ���ˡ�
     */
	int type;
    /**
     * @brief  ӭ�������ݡ�
     */
	string welcword;
    /**
     * @brief  ���ݱ��е�id��
     */
	int weleordid;
};
sequence<WWInfo> WWlist;

/**
 * @brief  ӭ����ṹ��
 */
struct WWST
{
    /**
     * @brief  ״̬�롣
     */
	int code;
    /**
     * @brief  ӭ�����б�
     */
	WWlist welcowords;
};

/**
 * @brief  ����λ���Ա��
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
     * @param rslt ���ؽ����FIXME ��������ô�ã�
     */
	void AccountCheck(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountAdd ��ӹ���Ա�˻���
     *
     * @param UserAcnt ��ӵ��˻���Ϣ��
     * @param rslt ���ؽ����
     */
	void AccountAdd(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountDelete ɾ������Ա��
     *
     * @param UserAcnt Ҫɾ���Ĺ���Ա��Ϣ��
     * @param rslt ���ؽ����
     */
	void AccountDelete(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountModefy �޸Ĺ���Ա��
     *
     * @param UserAcnt ����Ա��Ϣ��
     * @param rslt ���ؽ����
     */
	void AccountModefy(Account UserAcnt, out AcntRslt rslt);
    /**
     * @brief  AccountQuery ��ѯ����Ա��
     *
     * @param listrlt ���ع���Ա�б���Ϣ��
     */
	void AccountQuery(out AcntListRlt listrlt);

	/*Camera Management*/
    /**
     * @brief  CamAdd �������ͷ��
     *
     * @param caminfo ����ͷ��Ϣ��
     * @param rslt ���ؽ����
     */
	void CamAdd(CamInfo caminfo, out CamsListRlt rslt);
    /**
     * @brief  CamDelete ɾ������ͷ��Ϣ��
     *
     * @param caminfo ����ͷ��Ϣ��
     * @param rslt ���ؽ����
     */
	void CamDelete(CamInfo caminfo, out CamsListRlt rslt);
    /**
     * @brief  CamModefy �޸�����ͷ��Ϣ��
     *
     * @param Newcam ����ͷ��Ϣ��ͨ��id��λ����ͷ��Ȼ���޸�����������ֶΡ�
     * @param rslt ���ؽ����
     */
	void CamModefy(CamInfo Newcam, out CamsListRlt rslt);
    /**
     * @brief  CamQuery ����caminfo.camst��ѯ����ͷ�б�
     *
     * @param caminfo caminfo.camst�ֶ�Ϊ1ʱ��ʾ��ѯ����������ͷ��Ϊ0ʱ��ʾ��ѯ�رյ�����ͷ��Ϊ-1ʱ��ʾ��ѯ��������ͷ��
     * @param rslt ���ؽ����
     */
	void CamQuery(CamInfo caminfo,out CamsListRlt rslt);
    /**
     * @brief  SigCamQuery ����caminfo.id��ѯ��������ͷ��
     *
     * @param caminfo ��������ͷid��
     * @param rslt ���ؽ����
     */
	void SigCamQuery(CamInfo caminfo, out CamsListRlt rslt);

	/*Face Recognize*/
    /**
     * @brief  ChkCamStart ͨ������ͷid��������ͷ��
     *
     * @param caminfo ��������ͷid��
     * @param camst ���ؽ����
     */
	void ChkCamStart(CamInfo caminfo,out CamST camst);
    /**
     * @brief  ChkRsltQuery ��������ͷid����ȡ���ں�ӭ���ļ�¼����ǰ��ʵʱչʾ��
     *
     * @param caminfo ��������ͷid��
     * @param camst ���ؽ����
     */
	void ChkRsltQuery(CamInfo caminfo, out CamST camst);
    /**
     * @brief  ChkCamStop ��������ͷid�ر�����ͷ��
     *
     * @param caminfo ��������ͷid��
     * @param camst ���ؽ����
     */
	void ChkCamStop(CamInfo caminfo,out CamST camst);

	/*People Information Managment*/
    /**
     * @brief  PicUpload �ϴ�Ա����Ϣ��
     *
     * @param fileinfo Ա����Ϣ��
     * @param code ���ؽ�����������״̬�룬0��ʾ�ɹ���������ʾʧ�ܡ�
     */
	void PicUpload(FileInfo fileinfo, out PeoST code);
    /**
     * @brief  PicQuery ���ݹ��š����֤�š��Ա𡢹�˾���Ȳ���Ա����Ϣ��
     *
     * @param fileinfo ������ѯ������
     * @param code ����Ա����Ϣ��
     */
	void PicQuery(FileInfo fileinfo, out PeoST code);
    /**
     * @brief  PicDelete ����personid����ɾ��Ա����Ϣ��
     *
     * @param idType id��type
     * @param code ���ؽ�����������״̬�롣
     */
	void PicDelete(PersonIdType idType, out PeoST code);
    /**
     * @brief  PicModefy ����personid�޸�Ա����Ϣ��
     *
     * @param mpinfo �������personid��
     * @param code ���ؽ�����������״̬�롣
     */
	void PicModefy(PersonInfo mpInfo, out PeoST code);
    /**
     * @brief  PicUpdate ����Ա��id����Ա����Ϣ��
     *
     * @param mpicinfo ����Ա��id����ϸ��Ϣ��
     * @param code ���ؽ�����������״̬�롣
     */
	void PicUpdate(Mpic mpicInfo, out PeoST code);

	/*History Record Managment*/
    /**
     * @brief  HistoryQuery ��ѯ��ʷ��¼��
     *
     * @param hisinfo ��ѯ������
     * @param hisacrd ���ز�ѯ����ʷ��¼��
     */
	void HistoryQuery(HisInfo hisinfo, out AcrdQueryRslt hisacrd);
    /**
     * @brief  HistoryDelete ������ʷ��¼id��ɾ����ʷ��¼��
     *
     * @param hisid ��ʷ��¼id��
     * @param hisacrd ���ؽ��������״̬�롣
     */
	void HistoryDelete(int hisid, out AcrdQueryRslt hisacrd);
    /**
     * @brief  HistoryGroup ������ʷ��¼id���ҵ���ʷ��¼����ˣ����úڰ�������
     *
     * @param groupm ������ʷ��¼id�ͺڰ������ֶΡ�
     * @param hisacrd ���ؽ��������״̬�롣
     */
	void HistoryGroup(GroupModefy groupm, out AcrdQueryRslt hisacrd);

	/*Company Information Managment*/
    /**
     * @brief  CompanyAdd ��ӹ�˾��Ϣ��
     *
     * @param companyname ��˾����
     * @param opst ���ؽ��������״̬�롣
     */
	void CompanyAdd(string companyName, out OperST opst);
    /**
     * @brief  CompanyDelete ɾ����˾��
     *
     * @param companyid ��˾id��
     * @param opst ���ؽ��������״̬�롣
     */
	void CompanyDelete(int companyId, out OperST opst);
    /**
     * @brief  CompanyQuery ��ѯ���й�˾��
     *
     * @param opst ����״̬�롢��˾id�͹�˾����
     */
	void CompanyQuery(out OperST opst);

	/*Department Information Managment*/
    /**
     * @brief  DeptAdd ��Ӳ�����Ϣ��
     *
     * @param deptname ��������
     * @param deptst ���ؽ��������״̬�롣
     */
	void DeptAdd(string deptname, out DeptST deptst);
    /**
     * @brief  DeptDelete ɾ��������Ϣ��
     *
     * @param departmentid ����id��
     * @param deptst ���ؽ��������״̬�롣
     */
	void DeptDelete(int departmentid, out DeptST deptst);
    /**
     * @brief  DeptQuery ��ѯ���в�����Ϣ��
     *
     * @param deptst ���ؽ��������״̬�롢����id�Ͳ�������
     */
	void DeptQuery(out DeptST deptst);

	/*Position Information Managment*/
    /**
     * @brief  PositAdd ���ְλ��Ϣ��
     *
     * @param positname ְλ����
     * @param positst ���ؽ��������״̬�롣
     */
	void PositAdd(string positname, out PositST positst);
    /**
     * @brief  PositDelete ɾ��ְλ��Ϣ��
     *
     * @param positionid ְλid��
     * @param positst ���ؽ������״̬�롣
     */
	void PositDelete(int positionid, out PositST positst);
    /**
     * @brief  PositQuery ��ѯְλ��Ϣ��
     *
     * @param positst ����״̬�롢ְλid��ְλ����
     */
	void PositQuery(out PositST positst);

	/*Attendance Rule Managment*/
    /**
     * @brief  AttendRuleAdd ��ӿ��ڹ���
     *
     * @param ruleinfo ���ڹ���
     * @param rulest ���ؽ��������״̬�롣
     */
	void AttendRuleAdd(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
    /**
     * @brief  AttnedRuleDelete ɾ�����ڹ���
     *
     * @param ruleinfo �������ڹ���id��
     * @param rulest ���ؽ��������״̬�롣
     */
	void AttnedRuleDelete(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
    /**
     * @brief  AttnedRuleModefy ���ݿ��ڹ���id���޸Ŀ��ڹ���
     *
     * @param ruleinfo ���ڹ�����Ϣ��
     * @param rulest ���ؽ��������״̬�롣
     */
	void AttnedRuleModefy(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
    /**
     * @brief  AttnedRuleQuery ��ѯ���п��ڹ���
     *
     * @param ruleinfo δʹ�á�
     * @param rulest ���п��ڹ�����Ϣ��
     */
	void AttnedRuleQuery(AttendRuleInfo ruleinfo, out AttRuleSt rulest);
	
	/*Attendance Accord Managment*/
    /**
     * @brief  AttenAccordQuery ������������˾����ʱ�䷶Χ�Ȳ�ѯ���ڼ�¼��
     *
     * @param aaqinfo ��ѯ������
     * @param aaqst ���ڼ�¼�б�
     */
	void AttenAccordQuery(AAQueryInfo aaqinfo, out AAST aaqst);
    /**
     * @brief  AbAttenAccordQuery ������������˾����ʱ�䷶Χ�Ȳ�ѯ�쳣�Ŀ��ڼ�¼��
     *
     * @param aaqinfo ��ѯ������
     * @param aaqst �쳣�Ŀ��ڼ�¼��
     */
	void AbAttenAccordQuery(AAQueryInfo aaqinfo, out AAST aaqst);

	/*Welcom Words Management*/
    /**
     * @brief  WelWordAdd ���ӭ���
     *
     * @param wwinfo ӭ����ṹ��
     * @param wwst ���ؽ��������״̬�롣
     */
	void WelWordAdd(WWInfo wwinfo, out WWST wwst);
    /**
     * @brief  WelWordQuery ��ѯ����ӭ���
     *
     * @param wwst ����״̬���ӭ�����б�
     */
	void WelWordQuery(out WWST wwst);
    /**
     * @brief  WelWordDelete ����ӭ��������ɾ��ӭ���
     *
     * @param wwinfo ����ӭ�������͡�
     * @param wwst ���ؽ��������״̬�롣
     */
	void WelWordDelete(WWInfo wwinfo, out WWST wwst);

    /**
     * @brief  AddConference ��ӻ��顣
     *
     * @param confInfo json��ʽ�Ļ�����Ϣ������
     *                  {"name": "�ڶ��λ���", "time": "2017-02-30 10:00:00", "addr": "xx��xx·", "topic": "xxoo"}
     * @param res �ɹ���ʧ�ܡ�����
     *                  �ɹ� - {"code": 0, "confId": 0}
     *                  ʧ�� - �û����� {"code": <��0>, "msg": "��ͬ�Ļ������������"} ����code < 300
     *                       - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void AddConference(string confInfo, out string res);

    /**
     * @brief  DelConference ɾ�����顣
     *
     * @param confId ����id��
     * @param res �ɹ���ʧ�ܡ�����
     *                  �ɹ� - {"code": 0}
     *                  ʧ�� - �û����� {"code": <��0>, "msg": "���鲻����"} ����code < 300
     *                       - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void DelConference(int confId, out string res);

    /**
     * @brief  ModConference �޸Ļ��顣
     *
     * @param confId ����id��
     * @param confInfo json��ʽ�Ļ�����Ϣ������
     *                  {"name": "�ڶ��λ���", "time": "2017-02-30 10:00:00", "addr": "xx��xx·", "topic": "xxoo"}
     * @param res �ɹ���ʧ�ܡ�����
     *                  �ɹ� - {"code": 0}
     *                  ʧ�� - �û����� {"code": <��0>, "msg": "���鲻����"} ����code < 300
     *                       - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void ModConference(int confId, string confInfo, out string res);

    /**
     * @brief  QueryConfInfo ��ѯ���л�����Ϣ��
     *
     * @param res �ɹ���ʧ�ܡ�����
     *                  �ɹ� - {"code": 0, "info": [{"confId": 3, "name": "�ڶ��λ���", "time": ...}]}
     *                  ʧ�� - �û����� {"code": <��0>, "msg": "���ݿ�����޷����ӣ���鿴"} ����code < 300
     *                       - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void QueryAllConfInfo(out string res);

    /**
     * @brief  AddConfAttendees ��������Ա��
     *
     * @param confId ����id��
     * @param attendees �λ���Ա��Ϣ���顣����ͼƬ��������
     * @param res �ɹ���ʧ�ܡ�����
     *                 �ɹ� - {"code": 0}
     *                 ʧ�� - �û����� {"code": <��0>, "msg": "���鲻����"} ����code < 300
     *                      - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void AddConfAttendees(int confId, SeqConfAttendee attendees, out string res);

    /**
     * @brief  DelConfAttendee ɾ�������Ա��
     *
     * @param confId ����id��
     * @param attendId �����Աid��
     * @param res �ɹ���ʧ�ܡ�����
     *                 �ɹ� - {"code": 0}
     *                 ʧ�� - �û����� {"code": <��0>, "msg": "�����Ա������"} ����code < 300
     *                      - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void DelConfAttendees(int confId, int attendId, out string res);

    /**
     * @brief  ModConfAttendee �޸������Ա��
     *
     * @param confId ����id��
     * @param attendId �����Աid��
     * @param attendee �����Ա��Ϣ��������������Ƭ��
     * @param res �ɹ���ʧ�ܡ�����
     *                 �ɹ� - {"code": 0}
     *                 ʧ�� - �û����� {"code": <��0>, "msg": "�����Ա������"} ����code < 300
     *                      - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void ModConfAttendees(int confId, int attendId, ConferenceAttendee attendee, out string res);

    /**
     * @brief  QueryConfInfo ��ѯ����������Ϣ�Ͳλ���Ա��
     *
     * @param confId ����id��
     * @param res �ɹ���ʧ�ܡ�����
     *                  �ɹ� - {"code": 0, "info": {"confId": 3, "confInfo": {"name": "�ڶ��λ���", "time": ..""}, "addtendees": [{"id": 1, "name": "xx", "photo_url": "fdsd"}]}}
     *                  ʧ�� - �û����� {"code": <��0>, "msg": "�����ڸû��飬��ȷ���Ƿ���ɾ��"} ����code < 300
     *                       - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void QueryConfInfo(int confId, out string res);

    /**
     * @brief  QueryConfAttendingStatus ��ѯ�����Ա�ĵ��������
     *
     * @param confId ����id��
     * @param camId �����id��
     * @param count ��ѯ������������ݡ�-1��ʾ��ѯ�������ݡ�
     * @param res �ɹ���ʧ�ܡ�����
     *                 �ɹ� - {"code": 0, "info": {"confId": 3, "confInfo": {...}, "camId": 4, "count": 100, "addtending": ["name": "xx", "photo_url": "xx"... "time": "2017-02-10 15:00:00"]}}
     *                 ʧ�� - �û����� {"code": <��0>, "msg": "����ͷ����Ϣ�������Ƿ����"} ����code < 300
     *                      - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void QueryConfAttendingStatus(int confId, int camId, int count, out string res);

    /**
     * @brief  QueryConfAttendeeStatus ��ѯָ�������Ա�ĵ��������
     *
     * @param confId ����id��
     * @param attendId �����Աid��
     * @param res �ɹ���ʧ�ܡ�����
     *                 �ɹ� - {"code": 0, "info": {"confId": 3, "confInfo": {...}, "attendId": 10, "name": "xx", "photo_url": "xx"...}}
     *                        ��������Ա������info�ֶ��ﻹ��    {"status": "present", "time": "2017-02-11 15:00:00", "camId": 1}��
     *                        ��������Աδ������info�ֶ��ﻹ��  {"status": "absent"}
     *                 ʧ�� - �û����� {"code": <��0>, "msg": "û�и������Ա"} ����code < 300
     *                      - �û������� {"code": <��0>, "msg": "debug��Ϣ"} ����code >= 300
     */
    void QueryConfAttendeeStatus(int confId, int attendId, out string res);

    /**
     * @brief  shutdown �رճ���
     */
	void shutdown();
};

};
