// 분야별 지원 제도
// - category: life(생활안정) / housing(주거) / farm(농업) / shop(소상공인) / tax(세금 감면)
// - tags: '지원 찾기' 질문과 연결 (all = 모든 피해 주민)
//     house(집 피해), farm(농사), shop(가게·사업), injury(다친 가족)
// - phone: 담당 정부 부처·기관의 공식 상담 번호
// ★ 지원 금액과 기간은 산불마다 정부가 따로 정해 발표하므로, 정확한 금액은 시·군청 안내를 따릅니다.

var SUPPORT_CATEGORIES = [
  { id: "life", label: "생활안정" },
  { id: "housing", label: "주거" },
  { id: "farm", label: "농업" },
  { id: "shop", label: "소상공인" },
  { id: "tax", label: "세금 감면" }
];

var SUPPORT = [
  {
    id: "life-1", category: "life", tags: ["all"],
    name: "재난지원금 (생활안정 지원)",
    summary: "산불로 피해를 입은 가구의 생활을 돕는 정부 지원금이에요.",
    target: "피해 신고를 하고 피해가 확인된 주민",
    amount: "집 피해 정도(전부 탐·반 이상 탐 등)에 따라 정부가 정한 기준으로 지급해요.",
    place: "주소지 읍·면·동 행정복지센터",
    documents: ["신분증", "피해 신고서 (행정복지센터에 있어요)", "피해 사진 (있으면)", "지원금 받을 통장 사본"],
    phone: "02-2100-3399", phoneName: "행정안전부 콜센터 (평일 09:00~18:00)",
    source: "행정안전부 재난지원 안내"
  },
  {
    id: "life-2", category: "life", tags: ["all"],
    name: "구호물품·임시 대피 지원",
    summary: "식료품, 생필품, 옷, 담요 등을 받을 수 있어요.",
    target: "대피 중이거나 집을 잃은 주민",
    amount: "구호물품, 급식, 임시 대피소 이용",
    place: "임시 대피소, 읍·면·동 행정복지센터",
    documents: ["따로 필요 없어요 (이름과 주소 확인)"],
    phone: "02-2100-3399", phoneName: "행정안전부 콜센터 (평일 09:00~18:00)",
    source: "행정안전부 재난구호 안내"
  },
  {
    id: "life-3", category: "life", tags: ["injury"],
    name: "사망·부상 구호금",
    summary: "산불로 가족을 잃었거나 크게 다친 분께 드리는 구호금이에요.",
    target: "산불로 세상을 떠난 분의 유가족, 크게 다친 분",
    amount: "정부가 정한 기준 금액을 지급해요.",
    place: "주소지 시·군청 또는 행정복지센터",
    documents: ["신분증", "진단서 또는 사망 관련 서류", "가족관계증명서 (유가족)"],
    phone: "02-2100-3399", phoneName: "행정안전부 콜센터 (평일 09:00~18:00)",
    source: "행정안전부 재난지원 안내"
  },
  {
    id: "housing-1", category: "housing", tags: ["house"],
    name: "임시 주거 지원",
    summary: "집에 살 수 없을 때 머물 곳을 마련해 드려요.",
    target: "집이 불에 타거나 크게 부서져 살 수 없는 가구",
    amount: "임시 조립주택, 공공 임대주택 등 머물 곳 제공",
    place: "주소지 시·군청, 읍·면·동 행정복지센터",
    documents: ["신분증", "피해 확인 서류"],
    phone: "1599-0001", phoneName: "국토교통부 콜센터 (평일 09:00~18:00)",
    source: "행정안전부·국토교통부 산불 피해 지원 발표 (2019년 강원 산불)"
  },
  {
    id: "housing-2", category: "housing", tags: ["house"],
    name: "주택 복구 지원·융자",
    summary: "집을 다시 짓거나 고치는 비용을 돕고, 낮은 이자로 빌려 드려요.",
    target: "피해 주택 소유자 (세입자는 따로 문의)",
    amount: "복구비 지원과 별도로 주택도시기금의 낮은 이자 융자를 받을 수 있어요.",
    place: "주소지 시·군청",
    documents: ["신분증", "피해사실 확인서", "건축물 관련 서류"],
    phone: "1599-0001", phoneName: "국토교통부 콜센터 (평일 09:00~18:00)",
    source: "행정안전부·국토교통부 산불 피해 지원 발표"
  },
  {
    id: "farm-1", category: "farm", tags: ["farm"],
    name: "농업 시설·농기계 복구 지원",
    summary: "비닐하우스, 축사, 농기계, 가축 피해 복구를 도와요.",
    target: "산불로 피해를 입은 농업인",
    amount: "피해 규모에 따라 복구비 지원과 융자",
    place: "주소지 읍·면사무소, 시·군 농업기술센터",
    documents: ["신분증", "농업경영체 등록 확인서", "피해 사진"],
    phone: "02-3775-6700", phoneName: "농업정책보험금융원 (농림축산식품부 산하, 재해보험·정책자금)",
    source: "농림축산식품부 재해 지원 안내"
  },
  {
    id: "farm-2", category: "farm", tags: ["farm"],
    name: "영농 자금 상환 연기·이자 감면",
    summary: "농사 때문에 빌린 돈을 갚는 날을 미루거나 이자를 줄여요.",
    target: "피해 농업인 중 정책자금 대출이 있는 분",
    amount: "상환 연기, 이자 감면",
    place: "대출받은 농협 등 금융기관",
    documents: ["피해사실 확인서"],
    phone: "02-3775-6700", phoneName: "농업정책보험금융원 (농림축산식품부 산하, 재해보험·정책자금)",
    source: "농림축산식품부 재해 지원 안내"
  },
  {
    id: "shop-1", category: "shop", tags: ["shop"],
    name: "소상공인 재해 복구 자금",
    summary: "가게를 다시 여는 데 필요한 돈을 낮은 이자로 빌려 드려요.",
    target: "산불로 피해를 입은 소상공인",
    amount: "낮은 고정 금리의 재해 복구 융자",
    place: "소상공인시장진흥공단 지역센터",
    documents: ["사업자등록증", "재해 확인증 (시·군청에서 발급)"],
    phone: "1357", phoneName: "중소기업통합콜센터 (중소벤처기업부, 국번 없이)",
    source: "중소벤처기업부 재해 소상공인 지원 안내"
  },
  {
    id: "shop-2", category: "shop", tags: ["shop", "farm", "house"],
    name: "대출 만기 연장·상환 유예",
    summary: "이미 받은 대출을 갚는 날을 미룰 수 있어요.",
    target: "피해를 입은 개인과 사업자",
    amount: "만기 연장, 원금 상환 유예",
    place: "거래하는 은행",
    documents: ["피해사실 확인서"],
    phone: "1332", phoneName: "금융감독원 금융민원·상담 (국번 없이)",
    source: "금융위원회·금융감독원 재해 금융지원 안내"
  },
  {
    id: "tax-1", category: "tax", tags: ["all"],
    name: "국세 납부 기한 연장·징수 유예",
    summary: "소득세, 부가가치세 등을 내는 날을 미룰 수 있어요.",
    target: "산불 피해를 입은 납세자",
    amount: "신고·납부 기한 연장, 이미 고지된 세금 징수 유예",
    place: "관할 세무서 또는 홈택스",
    documents: ["피해사실 확인서"],
    phone: "126", phoneName: "국세상담센터 (국세청, 국번 없이)",
    source: "국세청 재해 피해 세정 지원 안내"
  },
  {
    id: "tax-2", category: "tax", tags: ["house", "farm", "shop"],
    name: "지방세 감면",
    summary: "타 버린 집·차·농기계를 새로 살 때 세금을 줄여 드려요.",
    target: "산불로 집, 자동차, 농기계 등을 잃은 분",
    amount: "대신할 물건을 살 때 취득세 등 면제, 기한 연장",
    place: "주소지 시·군청 세무과",
    documents: ["피해사실 확인서"],
    phone: "02-2100-3399", phoneName: "행정안전부 콜센터 (평일 09:00~18:00)",
    source: "행정안전부 산불 피해 지방세 지원 발표"
  }
];
