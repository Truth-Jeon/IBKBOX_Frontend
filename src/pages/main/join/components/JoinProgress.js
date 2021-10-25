import "assets/styles/joinprogress.css";

const JoinProgress = (props) => {
  const { step, stepName } = props.state;
  const stepTitleList = [
    { title: "관리자본인인증", step: "SELF_AUTH" },
    { title: "약관동의", step: "TERMS" },
    { title: "관리자계정등록", step: "" },
    { title: "사업자정보등록", step: "" },
    { title: "가입완료", step: "" },
  ];

  return (
    <div className="list__box">
      <div className="list__box__inner">
        <ul>
          {stepTitleList.map((element) => {
            return (
              <li className={element.step == stepName ? `on` : ``}>
                <div>
                  <div className="circle"></div>
                  <span>{element.title}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default JoinProgress;
