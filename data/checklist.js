// 시기별 회복 체크리스트
// - id: 체크 상태를 저장하는 이름 (겹치지 않게, 바꾸지 마세요)
// - link: "자세히 보기"로 연결할 페이지 (없으면 "")

var CHECKLIST = [
  {
    id: "week",
    label: "직후~1주",
    intro: "먼저 몸과 마음의 안전을 챙기세요.",
    items: [
      { id: "w1", title: "안전한 곳에 머물기", desc: "임시 대피소 위치는 시·군청이나 읍·면·동 행정복지센터에서 알려 드려요.", link: "contact.html" },
      { id: "w2", title: "가족과 이웃 안부 확인하기", desc: "연락이 안 되는 가족이 있으면 가까운 행정복지센터에 알려 주세요.", link: "" },
      { id: "w3", title: "피해 모습 사진 찍어 두기", desc: "치우기 전에 집, 밭, 가게, 농기계를 여러 방향에서 찍어 두세요.", link: "" },
      { id: "w4", title: "피해 신고하기", desc: "주소지 읍·면·동 행정복지센터나 시·군청에 신고해요. 신고 기한이 있으니 되도록 빨리 하세요.", link: "support.html#life" },
      { id: "w5", title: "신분증·통장·약 다시 챙기기", desc: "신분증은 행정복지센터, 통장은 거래 은행에서 다시 만들 수 있어요.", link: "faq.html" }
    ]
  },
  {
    id: "month",
    label: "1개월",
    intro: "받을 수 있는 지원을 하나씩 신청하세요.",
    items: [
      { id: "m1", title: "나에게 맞는 지원 찾아보기", desc: "질문 몇 개에 답하면 해당되는 지원만 보여 드려요.", link: "find.html" },
      { id: "m2", title: "생활안정 지원 신청하기", desc: "피해 신고가 확인되면 정부 기준에 따라 지원금을 받을 수 있어요.", link: "support.html#life" },
      { id: "m3", title: "임시 주거 정하기", desc: "집에 살 수 없다면 임시 거처를 시·군청과 상의하세요.", link: "support.html#housing" },
      { id: "m4", title: "농업·가게 피해 확인 받기", desc: "피해사실 확인서가 있어야 복구비와 융자를 신청할 수 있어요.", link: "support.html#farm" },
      { id: "m5", title: "잠을 못 자거나 불안하면 상담 받기", desc: "마음이 힘든 것은 자연스러운 반응이에요. 1670-9512로 무료 상담을 받을 수 있어요.", link: "mind.html" }
    ]
  },
  {
    id: "half",
    label: "6개월",
    intro: "서두르지 않아도 괜찮아요. 천천히, 다시 일상을 그려 가는 시기예요.",
    items: [
      { id: "h1", title: "주택 복구 계획 세우기", desc: "복구비 지원과 낮은 이자의 융자를 함께 알아보세요.", link: "support.html#housing" },
      { id: "h2", title: "세금 감면·납부 연기 확인하기", desc: "국세는 국세청(126), 지방세는 시·군청 세무과에 물어보세요.", link: "support.html#tax" },
      { id: "h3", title: "다음 농사·영업 준비하기", desc: "영농 자금과 소상공인 자금 상환을 미룰 수 있는지 확인하세요.", link: "support.html#farm" },
      { id: "h4", title: "가족 건강 살피기", desc: "연기를 많이 마셨다면 가까운 병원에서 진료를 받아 보세요.", link: "" }
    ]
  },
  {
    id: "year",
    label: "1년 이후",
    intro: "남은 지원을 확인하고, 이웃과 함께 회복해요.",
    items: [
      { id: "y1", title: "아직 받지 못한 지원 확인하기", desc: "신청 기한이 지난 것은 없는지 시·군청에 물어보세요.", link: "contact.html" },
      { id: "y2", title: "대출 갚는 일정 확인하기", desc: "상환 유예가 끝나는 날짜를 미리 확인해 두세요.", link: "support.html#shop" },
      { id: "y3", title: "산불 1년 무렵 마음 살피기", desc: "그날이 다가오면 다시 힘들어질 수 있어요. 상담을 받아도 괜찮아요.", link: "mind.html" },
      { id: "y4", title: "마을 모임·결연 활동 참여하기", desc: "이웃과 함께하면 회복이 빨라져요.", link: "" }
    ]
  }
];
