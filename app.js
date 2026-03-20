/* ================================================================
   やさしいCloudflareガイド — app.js
   MVC: Model(data) + View(render) + Controller(router/i18n)
   ================================================================ */

/* ---- CONTROLLER: Language Management ---- */
var SUPPORTED = ["ja","en","zh","ko","es","fr","de","pt"];
var currentLang = "ja";

function detectLang(){
  var saved = localStorage.getItem("cf-guide-lang");
  if(saved && SUPPORTED.indexOf(saved)!==-1) return saved;
  var nav = (navigator.language||navigator.userLanguage||"ja").toLowerCase();
  if(nav.startsWith("zh")) return "zh";
  for(var i=0;i<SUPPORTED.length;i++){
    if(nav.startsWith(SUPPORTED[i])) return SUPPORTED[i];
  }
  return "en";
}

function setLang(code){
  currentLang=code;
  localStorage.setItem("cf-guide-lang",code);
  document.documentElement.lang=code==="zh"?"zh-CN":code;
  renderApp();
  updateNav();
}

/* ---- MODEL: UI Translations ---- */
var UI={
ja:{
  name:"日本語",flag:"🇯🇵",
  siteTitle:"やさしいCloudflareガイド",
  nav:{services:"サービス一覧",intuitive:"できること",limits:"無料枠一覧",usecases:"活用例",about:"サイトについて"},
  home:{
    h1_1:"Cloudflare",h1_2:"を",h1_3:"やさしく学ぼう",
    desc:'Cloudflareは、あなたのWebサイトを<strong>「速く」「安全に」</strong>してくれるサービスです。多くの機能が無料で使えます。初めての方にもわかりやすくご紹介します。',
    btn1:"できることを見る",btn2:"サービス一覧",
    whyTitle:"Cloudflareのすごいところ",whySub:"なぜ多くの人に選ばれているのか",
    catTitle:"サービスカテゴリ",catSub:"Cloudflareの主要サービスをカテゴリ別にご紹介",
    why:[
      {icon:"💰",t:"無料で使える機能が豊富",d:"攻撃防御もサイト高速化も、個人サイトなら無料プランで十分に使えます。",c:"g"},
      {icon:"🌍",t:"世界300か所以上にサーバー設置",d:"世界中にサーバーがあるので、どの国からアクセスしても高速です。",c:"b"},
      {icon:"🛡️",t:"セキュリティが充実",d:"サイバー攻撃の防御、通信の暗号化、Bot対策まで無料で利用できます。",c:"o"},
      {icon:"⚡",t:"自分のプログラムを動かせる",d:"自分でサーバーを用意しなくても、Cloudflare上でプログラムを実行できます。",c:"p"},
      {icon:"🔧",t:"設定がかんたん",d:"DNS（ドメインの設定）を変更するだけで利用開始できます。複雑な作業は不要です。",c:"a"},
      {icon:"📈",t:"成長に合わせて拡張できる",d:"小さなブログから大規模サービスまで。必要に応じて有料プランに切り替えられます。",c:"r"}
    ]
  },
  servicesPg:{title:"サービス一覧",sub:"Cloudflareの主な無料サービスをカテゴリ別にご紹介します"},
  intPg:{title:"Cloudflareでできること",sub:"専門用語を使わずに、できることをわかりやすくご紹介します"},
  limitsPg:{title:"無料枠まとめ",sub:"各サービスの無料プランで使える量の一覧です",thSvc:"サービス名",thLimit:"無料で使える量（これを超えると有料）",note:"※ 上記はすべて無料プランの上限です。有料プランではこれらの上限が大幅に引き上げられます。"},
  ucPg:{title:"活用シナリオ",sub:"こんな場面でCloudflareの無料プランが活躍します",phTitle:"Cloudflare無料プランの考え方"},
  detailPg:{back:"← 戻る",explain:"📖 くわしい説明",freeFeats:"🆓 無料プランでできること",usecases:"💡 こんなときに使えます",related:"📂 同じカテゴリの他のサービス",notFound:"ページが見つかりませんでした。"},
  aboutPg:{
    title:"サイトについて",sub:"このサイトの情報と注意事項",
    warnTitle:"⚠️ 重要なお知らせ",
    warnText:'このサイトは非公式サイトとしてCloudflareの説明をしています。情報に誤りがある場合もありますので、正しくは<a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>でご確認下さい。なおこのサイトはClaudeで作成されています。',
    purposeTitle:"📌 サイトの目的",
    purposeText:"Cloudflareの豊富な無料サービスについて、初心者の方にもわかりやすく日本語で紹介することを目的としています。できるだけ専門用語を避け、平易な表現で解説しています。",
    linksTitle:"🔗 公式リンク集",
    techTitle:"🛠 技術情報",
    techText:"このサイトはClaude（Anthropic社のAI）によって作成された静的サイトです。HTML・CSS・JavaScriptのみで構成されており、ビルドツールやデータベースは使用していません。そのままGitHub Pagesなどで公開できます。"
  },
  footer:{
    notice:'このサイトは非公式サイトとしてCloudflareの説明をしています。情報に誤りがある場合もありますので、正しくは<a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>でご確認下さい。なおこのサイトはClaudeで作成されています。'
  },
  qlLinks:[
    {href:"#/limits",icon:"📋",t:"無料枠まとめ",d:"各サービスの無料枠を確認"},
    {href:"#/usecases",icon:"💡",t:"活用シナリオ",d:"こんな使い方ができます"},
    {href:"#/about",icon:"ℹ️",t:"サイトについて",d:"注意事項と公式リンク"}
  ]
},
en:{
  name:"English",flag:"🇬🇧",
  siteTitle:"Cloudflare Guide",
  nav:{services:"Services",intuitive:"What It Does",limits:"Free Limits",usecases:"Use Cases",about:"About"},
  home:{
    h1_1:"Cloudflare",h1_2:"",h1_3:"Made Simple",
    desc:'Cloudflare makes your website <strong>faster and safer</strong>. Many features are available for free. This guide explains everything in simple terms.',
    btn1:"What It Does",btn2:"All Services",
    whyTitle:"Why Cloudflare?",whySub:"Why so many people choose Cloudflare",
    catTitle:"Service Categories",catSub:"Explore Cloudflare services by category",
    why:[
      {icon:"💰",t:"Generous free plan",d:"DDoS protection, CDN, and unlimited bandwidth — all free for personal sites.",c:"g"},
      {icon:"🌍",t:"300+ global server locations",d:"Servers worldwide mean fast access no matter where your visitors are.",c:"b"},
      {icon:"🛡️",t:"Strong security",d:"Attack protection, encryption, and bot blocking — all included for free.",c:"o"},
      {icon:"⚡",t:"Run your own code",d:"Execute programs on Cloudflare's servers without managing your own.",c:"p"},
      {icon:"🔧",t:"Easy setup",d:"Just update your DNS settings to get started. No complex configuration needed.",c:"a"},
      {icon:"📈",t:"Grows with you",d:"From small blogs to large services. Upgrade to paid plans when you need more.",c:"r"}
    ]
  },
  servicesPg:{title:"All Services",sub:"A complete list of Cloudflare's free services by category"},
  intPg:{title:"What Cloudflare Can Do",sub:"Plain-language explanations of what each feature does for you"},
  limitsPg:{title:"Free Plan Limits",sub:"How much you can use on the free plan",thSvc:"Service",thLimit:"Free Allowance (paid beyond this)",note:"※ These are free-plan limits. Paid plans offer significantly higher limits."},
  ucPg:{title:"Use Cases",sub:"Real scenarios where Cloudflare's free plan shines",phTitle:"Cloudflare's Free Plan Philosophy"},
  detailPg:{back:"← Back",explain:"📖 Detailed Explanation",freeFeats:"🆓 What's Free",usecases:"💡 Good For",related:"📂 Related Services",notFound:"Page not found."},
  aboutPg:{
    title:"About This Site",sub:"Important information and disclaimers",
    warnTitle:"⚠️ Important Notice",
    warnText:'This is an unofficial site explaining Cloudflare services. Information may contain errors. Please verify at the <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">official site</a>. This site was created by Claude (AI by Anthropic).',
    purposeTitle:"📌 Purpose",
    purposeText:"This site aims to explain Cloudflare's free services in simple, beginner-friendly language.",
    linksTitle:"🔗 Official Links",
    techTitle:"🛠 Technical Info",
    techText:"This site is a static website built with plain HTML, CSS, and JavaScript. No build tools or databases required. It can be hosted directly on GitHub Pages."
  },
  footer:{
    notice:'This is an unofficial site. Information may contain errors. Please check the <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">official site</a>. Created by Claude (Anthropic).'
  },
  qlLinks:[
    {href:"#/limits",icon:"📋",t:"Free Limits",d:"Check each service's free allowance"},
    {href:"#/usecases",icon:"💡",t:"Use Cases",d:"Real-world scenarios"},
    {href:"#/about",icon:"ℹ️",t:"About",d:"Disclaimers & official links"}
  ]
},
zh:{
  name:"中文",flag:"🇨🇳",
  siteTitle:"Cloudflare 入门指南",
  nav:{services:"服务列表",intuitive:"功能介绍",limits:"免费额度",usecases:"使用场景",about:"关于本站"},
  home:{
    h1_1:"Cloudflare",h1_2:"",h1_3:"轻松入门",
    desc:'Cloudflare 让您的网站<strong>更快、更安全</strong>。许多功能完全免费。本指南用简单易懂的方式为您介绍。',
    btn1:"了解功能",btn2:"服务列表",
    whyTitle:"为什么选择 Cloudflare？",whySub:"深受全球用户信赖的原因",
    catTitle:"服务分类",catSub:"按类别浏览 Cloudflare 的主要服务",
    why:[
      {icon:"💰",t:"免费功能丰富",d:"DDoS防护、CDN加速、无限带宽——个人网站免费即可使用。",c:"g"},
      {icon:"🌍",t:"全球300+服务器节点",d:"服务器遍布全球，无论访客在哪里都能快速访问。",c:"b"},
      {icon:"🛡️",t:"安全防护完善",d:"攻击防御、通信加密、机器人拦截——全部免费提供。",c:"o"},
      {icon:"⚡",t:"可以运行自己的代码",d:"无需自己准备服务器，直接在Cloudflare上运行程序。",c:"p"},
      {icon:"🔧",t:"设置简单",d:"只需更改DNS设置即可开始使用，无需复杂配置。",c:"a"},
      {icon:"📈",t:"随业务增长扩展",d:"从小型博客到大型服务，需要时升级到付费计划。",c:"r"}
    ]
  },
  servicesPg:{title:"服务列表",sub:"按类别浏览 Cloudflare 的免费服务"},
  intPg:{title:"Cloudflare 能做什么",sub:"用通俗易懂的语言介绍各项功能"},
  limitsPg:{title:"免费额度一览",sub:"免费计划的使用限制",thSvc:"服务名称",thLimit:"免费额度（超出部分需付费）",note:"※ 以上为免费计划的限制。付费计划的限制会大幅提高。"},
  ucPg:{title:"使用场景",sub:"Cloudflare 免费计划的实际应用",phTitle:"Cloudflare 免费计划的理念"},
  detailPg:{back:"← 返回",explain:"📖 详细说明",freeFeats:"🆓 免费功能",usecases:"💡 适用场景",related:"📂 同类服务",notFound:"页面未找到。"},
  aboutPg:{
    title:"关于本站",sub:"重要信息和免责声明",
    warnTitle:"⚠️ 重要提示",
    warnText:'本站为非官方网站，介绍Cloudflare的相关服务。信息可能存在错误，请以<a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">官方网站</a>为准。本站由Claude（Anthropic的AI）创建。',
    purposeTitle:"📌 网站目的",purposeText:"用简单易懂的语言向初学者介绍Cloudflare的免费服务。",
    linksTitle:"🔗 官方链接",techTitle:"🛠 技术信息",techText:"本站使用纯HTML、CSS和JavaScript构建，无需构建工具或数据库。"
  },
  footer:{notice:'本站为非官方网站。信息可能有误，请以<a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">官方网站</a>为准。由Claude创建。'},
  qlLinks:[{href:"#/limits",icon:"📋",t:"免费额度",d:"查看各服务的免费限制"},{href:"#/usecases",icon:"💡",t:"使用场景",d:"实际应用案例"},{href:"#/about",icon:"ℹ️",t:"关于本站",d:"免责声明和官方链接"}]
},
ko:{
  name:"한국어",flag:"🇰🇷",
  siteTitle:"Cloudflare 가이드",
  nav:{services:"서비스 목록",intuitive:"기능 소개",limits:"무료 한도",usecases:"활용 사례",about:"사이트 소개"},
  home:{
    h1_1:"Cloudflare",h1_2:"를",h1_3:"쉽게 배우기",
    desc:'Cloudflare는 웹사이트를 <strong>빠르고 안전하게</strong> 만들어주는 서비스입니다. 많은 기능을 무료로 사용할 수 있습니다.',
    btn1:"기능 보기",btn2:"서비스 목록",
    whyTitle:"왜 Cloudflare인가?",whySub:"전 세계에서 선택받는 이유",
    catTitle:"서비스 카테고리",catSub:"카테고리별 Cloudflare 주요 서비스",
    why:[
      {icon:"💰",t:"풍부한 무료 기능",d:"DDoS 방어, CDN, 무제한 대역폭 — 개인 사이트라면 무료로 충분합니다.",c:"g"},
      {icon:"🌍",t:"전 세계 300+ 서버",d:"전 세계에 서버가 있어 어디서든 빠른 접속이 가능합니다.",c:"b"},
      {icon:"🛡️",t:"강력한 보안",d:"공격 방어, 암호화, 봇 차단까지 무료로 제공됩니다.",c:"o"},
      {icon:"⚡",t:"코드 실행 가능",d:"직접 서버를 준비하지 않아도 Cloudflare에서 프로그램을 실행할 수 있습니다.",c:"p"},
      {icon:"🔧",t:"간편한 설정",d:"DNS 설정만 변경하면 바로 시작할 수 있습니다.",c:"a"},
      {icon:"📈",t:"성장에 맞춰 확장",d:"소규모 블로그부터 대규모 서비스까지. 필요시 유료 플랜으로 업그레이드.",c:"r"}
    ]
  },
  servicesPg:{title:"서비스 목록",sub:"Cloudflare의 무료 서비스를 카테고리별로 소개합니다"},
  intPg:{title:"Cloudflare로 할 수 있는 것",sub:"전문 용어 없이 쉽게 설명합니다"},
  limitsPg:{title:"무료 한도 요약",sub:"무료 플랜에서 사용할 수 있는 양",thSvc:"서비스",thLimit:"무료 한도 (초과 시 유료)",note:"※ 위 내용은 모두 무료 플랜의 한도입니다. 유료 플랜에서는 크게 증가합니다."},
  ucPg:{title:"활용 사례",sub:"Cloudflare 무료 플랜이 빛나는 장면",phTitle:"Cloudflare 무료 플랜의 철학"},
  detailPg:{back:"← 돌아가기",explain:"📖 자세한 설명",freeFeats:"🆓 무료 기능",usecases:"💡 이런 때 유용합니다",related:"📂 같은 카테고리의 다른 서비스",notFound:"페이지를 찾을 수 없습니다."},
  aboutPg:{
    title:"사이트 소개",sub:"중요 정보 및 면책 사항",
    warnTitle:"⚠️ 중요 공지",
    warnText:'이 사이트는 비공식 사이트입니다. 정보에 오류가 있을 수 있으니 <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">공식 사이트</a>에서 확인하세요. 이 사이트는 Claude(Anthropic AI)로 제작되었습니다.',
    purposeTitle:"📌 목적",purposeText:"Cloudflare의 무료 서비스를 초보자도 이해하기 쉽게 소개하는 것을 목적으로 합니다.",
    linksTitle:"🔗 공식 링크",techTitle:"🛠 기술 정보",techText:"이 사이트는 순수 HTML, CSS, JavaScript로 구축되었습니다."
  },
  footer:{notice:'비공식 사이트입니다. <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">공식 사이트</a>에서 정확한 정보를 확인하세요. Claude로 제작.'},
  qlLinks:[{href:"#/limits",icon:"📋",t:"무료 한도",d:"서비스별 무료 한도 확인"},{href:"#/usecases",icon:"💡",t:"활용 사례",d:"실제 사용 시나리오"},{href:"#/about",icon:"ℹ️",t:"사이트 소개",d:"면책 사항 및 공식 링크"}]
},
es:{
  name:"Español",flag:"🇪🇸",
  siteTitle:"Guía de Cloudflare",
  nav:{services:"Servicios",intuitive:"Funciones",limits:"Límites gratis",usecases:"Casos de uso",about:"Acerca de"},
  home:{h1_1:"Cloudflare",h1_2:"",h1_3:"Fácil de entender",desc:'Cloudflare hace tu sitio web <strong>más rápido y seguro</strong>. Muchas funciones son gratuitas.',btn1:"Ver funciones",btn2:"Servicios",whyTitle:"¿Por qué Cloudflare?",whySub:"Razones por las que tantas personas lo eligen",catTitle:"Categorías",catSub:"Servicios principales por categoría",
  why:[{icon:"💰",t:"Plan gratuito generoso",d:"Protección DDoS, CDN y ancho de banda ilimitado — gratis para sitios personales.",c:"g"},{icon:"🌍",t:"300+ ubicaciones globales",d:"Servidores en todo el mundo para acceso rápido desde cualquier lugar.",c:"b"},{icon:"🛡️",t:"Seguridad sólida",d:"Protección contra ataques, cifrado y bloqueo de bots — todo gratis.",c:"o"},{icon:"⚡",t:"Ejecuta tu código",d:"Ejecuta programas en los servidores de Cloudflare sin gestionar los tuyos.",c:"p"},{icon:"🔧",t:"Configuración fácil",d:"Solo cambia tu configuración DNS para empezar.",c:"a"},{icon:"📈",t:"Crece contigo",d:"Desde blogs pequeños hasta grandes servicios.",c:"r"}]},
  servicesPg:{title:"Servicios",sub:"Lista completa de servicios gratuitos"},intPg:{title:"Lo que Cloudflare puede hacer",sub:"Explicaciones sencillas de cada función"},limitsPg:{title:"Límites del plan gratuito",sub:"Cuánto puedes usar gratis",thSvc:"Servicio",thLimit:"Límite gratuito (de pago si se supera)",note:"※ Estos son los límites del plan gratuito."},ucPg:{title:"Casos de uso",sub:"Escenarios donde Cloudflare brilla",phTitle:"Filosofía del plan gratuito"},
  detailPg:{back:"← Volver",explain:"📖 Explicación",freeFeats:"🆓 Gratis",usecases:"💡 Útil para",related:"📂 Servicios relacionados",notFound:"Página no encontrada."},
  aboutPg:{title:"Acerca de",sub:"Información importante",warnTitle:"⚠️ Aviso",warnText:'Este es un sitio no oficial. La información puede contener errores. Consulte el <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">sitio oficial</a>. Creado por Claude (Anthropic).',purposeTitle:"📌 Propósito",purposeText:"Explicar los servicios gratuitos de Cloudflare de forma sencilla.",linksTitle:"🔗 Enlaces oficiales",techTitle:"🛠 Info técnica",techText:"Sitio estático con HTML, CSS y JavaScript puro."},
  footer:{notice:'Sitio no oficial. Consulte el <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">sitio oficial</a>. Creado por Claude.'},
  qlLinks:[{href:"#/limits",icon:"📋",t:"Límites",d:"Límites del plan gratuito"},{href:"#/usecases",icon:"💡",t:"Casos de uso",d:"Escenarios reales"},{href:"#/about",icon:"ℹ️",t:"Acerca de",d:"Avisos y enlaces"}]
},
fr:{
  name:"Français",flag:"🇫🇷",
  siteTitle:"Guide Cloudflare",
  nav:{services:"Services",intuitive:"Fonctions",limits:"Limites gratuites",usecases:"Cas d'usage",about:"À propos"},
  home:{h1_1:"Cloudflare",h1_2:"",h1_3:"Simplifié",desc:'Cloudflare rend votre site <strong>plus rapide et plus sûr</strong>. De nombreuses fonctions sont gratuites.',btn1:"Voir les fonctions",btn2:"Services",whyTitle:"Pourquoi Cloudflare ?",whySub:"Les raisons de son succès mondial",catTitle:"Catégories",catSub:"Services principaux par catégorie",
  why:[{icon:"💰",t:"Plan gratuit généreux",d:"Protection DDoS, CDN, bande passante illimitée — gratuit pour les sites personnels.",c:"g"},{icon:"🌍",t:"300+ emplacements mondiaux",d:"Des serveurs partout dans le monde pour un accès rapide.",c:"b"},{icon:"🛡️",t:"Sécurité solide",d:"Protection contre les attaques, chiffrement, blocage des bots — tout gratuit.",c:"o"},{icon:"⚡",t:"Exécutez votre code",d:"Exécutez des programmes sur les serveurs Cloudflare sans gérer les vôtres.",c:"p"},{icon:"🔧",t:"Configuration facile",d:"Changez simplement vos paramètres DNS pour commencer.",c:"a"},{icon:"📈",t:"Évolue avec vous",d:"Des petits blogs aux grands services.",c:"r"}]},
  servicesPg:{title:"Services",sub:"Liste complète des services gratuits"},intPg:{title:"Ce que Cloudflare peut faire",sub:"Explications simples de chaque fonction"},limitsPg:{title:"Limites du plan gratuit",sub:"Ce que vous pouvez utiliser gratuitement",thSvc:"Service",thLimit:"Limite gratuite (payant au-delà)",note:"※ Ce sont les limites du plan gratuit."},ucPg:{title:"Cas d'usage",sub:"Scénarios où Cloudflare excelle",phTitle:"Philosophie du plan gratuit"},
  detailPg:{back:"← Retour",explain:"📖 Explication",freeFeats:"🆓 Gratuit",usecases:"💡 Utile pour",related:"📂 Services liés",notFound:"Page non trouvée."},
  aboutPg:{title:"À propos",sub:"Informations importantes",warnTitle:"⚠️ Avis",warnText:'Site non officiel. Les informations peuvent contenir des erreurs. Consultez le <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">site officiel</a>. Créé par Claude (Anthropic).',purposeTitle:"📌 Objectif",purposeText:"Expliquer les services gratuits de Cloudflare simplement.",linksTitle:"🔗 Liens officiels",techTitle:"🛠 Info technique",techText:"Site statique en HTML, CSS et JavaScript pur."},
  footer:{notice:'Site non officiel. Consultez le <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">site officiel</a>. Créé par Claude.'},
  qlLinks:[{href:"#/limits",icon:"📋",t:"Limites",d:"Limites du plan gratuit"},{href:"#/usecases",icon:"💡",t:"Cas d'usage",d:"Scénarios réels"},{href:"#/about",icon:"ℹ️",t:"À propos",d:"Avis et liens"}]
},
de:{
  name:"Deutsch",flag:"🇩🇪",
  siteTitle:"Cloudflare Leitfaden",
  nav:{services:"Dienste",intuitive:"Funktionen",limits:"Kostenlose Limits",usecases:"Anwendungsfälle",about:"Über uns"},
  home:{h1_1:"Cloudflare",h1_2:"",h1_3:"Einfach erklärt",desc:'Cloudflare macht Ihre Website <strong>schneller und sicherer</strong>. Viele Funktionen sind kostenlos.',btn1:"Funktionen ansehen",btn2:"Alle Dienste",whyTitle:"Warum Cloudflare?",whySub:"Gründe für die weltweite Beliebtheit",catTitle:"Kategorien",catSub:"Hauptdienste nach Kategorien",
  why:[{icon:"💰",t:"Großzügiger Gratisplan",d:"DDoS-Schutz, CDN und unbegrenzte Bandbreite — kostenlos für persönliche Seiten.",c:"g"},{icon:"🌍",t:"300+ globale Standorte",d:"Server weltweit für schnellen Zugriff von überall.",c:"b"},{icon:"🛡️",t:"Starke Sicherheit",d:"Angriffsschutz, Verschlüsselung und Bot-Blockierung — alles kostenlos.",c:"o"},{icon:"⚡",t:"Eigenen Code ausführen",d:"Programme auf Cloudflares Servern ausführen, ohne eigene zu verwalten.",c:"p"},{icon:"🔧",t:"Einfache Einrichtung",d:"Ändern Sie einfach Ihre DNS-Einstellungen.",c:"a"},{icon:"📈",t:"Wächst mit Ihnen",d:"Von kleinen Blogs bis zu großen Diensten.",c:"r"}]},
  servicesPg:{title:"Dienste",sub:"Vollständige Liste der kostenlosen Dienste"},intPg:{title:"Was Cloudflare kann",sub:"Einfache Erklärungen jeder Funktion"},limitsPg:{title:"Kostenlose Limits",sub:"Was Sie kostenlos nutzen können",thSvc:"Dienst",thLimit:"Kostenloses Limit (darüber hinaus kostenpflichtig)",note:"※ Dies sind die Limits des Gratisplans."},ucPg:{title:"Anwendungsfälle",sub:"Szenarien für den Gratisplan",phTitle:"Philosophie des Gratisplans"},
  detailPg:{back:"← Zurück",explain:"📖 Erklärung",freeFeats:"🆓 Kostenlos",usecases:"💡 Nützlich für",related:"📂 Verwandte Dienste",notFound:"Seite nicht gefunden."},
  aboutPg:{title:"Über uns",sub:"Wichtige Informationen",warnTitle:"⚠️ Hinweis",warnText:'Inoffizielle Seite. Informationen können Fehler enthalten. Bitte prüfen Sie die <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">offizielle Seite</a>. Erstellt von Claude (Anthropic).',purposeTitle:"📌 Zweck",purposeText:"Cloudflares kostenlose Dienste einfach erklären.",linksTitle:"🔗 Offizielle Links",techTitle:"🛠 Technische Info",techText:"Statische Seite mit reinem HTML, CSS und JavaScript."},
  footer:{notice:'Inoffizielle Seite. <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">Offizielle Seite</a> prüfen. Erstellt von Claude.'},
  qlLinks:[{href:"#/limits",icon:"📋",t:"Limits",d:"Kostenlose Limits"},{href:"#/usecases",icon:"💡",t:"Anwendungsfälle",d:"Reale Szenarien"},{href:"#/about",icon:"ℹ️",t:"Über uns",d:"Hinweise und Links"}]
},
pt:{
  name:"Português",flag:"🇧🇷",
  siteTitle:"Guia Cloudflare",
  nav:{services:"Serviços",intuitive:"Funções",limits:"Limites grátis",usecases:"Casos de uso",about:"Sobre"},
  home:{h1_1:"Cloudflare",h1_2:"",h1_3:"Simplificado",desc:'Cloudflare torna seu site <strong>mais rápido e seguro</strong>. Muitas funções são gratuitas.',btn1:"Ver funções",btn2:"Serviços",whyTitle:"Por que Cloudflare?",whySub:"Razões do sucesso mundial",catTitle:"Categorias",catSub:"Serviços principais por categoria",
  why:[{icon:"💰",t:"Plano gratuito generoso",d:"Proteção DDoS, CDN e largura de banda ilimitada — grátis para sites pessoais.",c:"g"},{icon:"🌍",t:"300+ localizações globais",d:"Servidores no mundo todo para acesso rápido de qualquer lugar.",c:"b"},{icon:"🛡️",t:"Segurança forte",d:"Proteção contra ataques, criptografia e bloqueio de bots — tudo grátis.",c:"o"},{icon:"⚡",t:"Execute seu código",d:"Execute programas nos servidores da Cloudflare sem gerenciar os seus.",c:"p"},{icon:"🔧",t:"Configuração fácil",d:"Basta alterar suas configurações DNS para começar.",c:"a"},{icon:"📈",t:"Cresce com você",d:"De blogs pequenos a grandes serviços.",c:"r"}]},
  servicesPg:{title:"Serviços",sub:"Lista completa dos serviços gratuitos"},intPg:{title:"O que Cloudflare pode fazer",sub:"Explicações simples de cada função"},limitsPg:{title:"Limites do plano gratuito",sub:"Quanto você pode usar de graça",thSvc:"Serviço",thLimit:"Limite grátis (pago além disso)",note:"※ Estes são os limites do plano gratuito."},ucPg:{title:"Casos de uso",sub:"Cenários onde Cloudflare se destaca",phTitle:"Filosofia do plano gratuito"},
  detailPg:{back:"← Voltar",explain:"📖 Explicação",freeFeats:"🆓 Grátis",usecases:"💡 Útil para",related:"📂 Serviços relacionados",notFound:"Página não encontrada."},
  aboutPg:{title:"Sobre",sub:"Informações importantes",warnTitle:"⚠️ Aviso",warnText:'Site não oficial. As informações podem conter erros. Consulte o <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">site oficial</a>. Criado por Claude (Anthropic).',purposeTitle:"📌 Objetivo",purposeText:"Explicar os serviços gratuitos da Cloudflare de forma simples.",linksTitle:"🔗 Links oficiais",techTitle:"🛠 Info técnica",techText:"Site estático com HTML, CSS e JavaScript puro."},
  footer:{notice:'Site não oficial. Consulte o <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">site oficial</a>. Criado por Claude.'},
  qlLinks:[{href:"#/limits",icon:"📋",t:"Limites",d:"Limites do plano gratuito"},{href:"#/usecases",icon:"💡",t:"Casos de uso",d:"Cenários reais"},{href:"#/about",icon:"ℹ️",t:"Sobre",d:"Avisos e links"}]
}
};

function u(){return UI[currentLang]||UI.en}

/* ---- MODEL: Service Data (multi-lang) ---- */
/* Returns localized service categories */
function getData(){
  var L=currentLang;
  /* For brevity, ja and en have full data; others fall back to en with translated names */
  if(L==="ja") return DATA_JA();
  if(L==="en") return DATA_EN();
  /* Other languages: use EN data with translated category/service names */
  var base=DATA_EN();
  var names=NAMES[L]||NAMES.en;
  if(names){
    base.forEach(function(cat,i){
      if(names.cats[cat.id]){cat.title=names.cats[cat.id].t;cat.subtitle=names.cats[cat.id].s;}
      cat.services.forEach(function(svc){
        if(names.svcs[svc.id]){
          svc.name=names.svcs[svc.id].n;
          svc.shortDesc=names.svcs[svc.id].d;
        }
      });
    });
  }
  return base;
}

/* Category & service name translations for non-ja/en */
var NAMES={
zh:{cats:{core:{t:"核心基础设施与性能",s:"遍布全球的服务器网络"},security:{t:"安全服务",s:"全方位保护您的网站"},developer:{t:"开发者平台",s:"在全球服务器上运行代码"},bot:{t:"机器人防护",s:"阻止恶意机器人"},dns:{t:"DNS服务",s:"快速安全的域名解析"},network:{t:"网络服务",s:"免费实现安全连接"},additional:{t:"其他免费功能",s:"更多Cloudflare的魅力"}},
svcs:{cdn:{n:"全球CDN",d:"从全球300+节点快速分发内容"},pagerules:{n:"页面规则",d:"按URL控制缓存和重定向"},ddos:{n:"DDoS防护",d:"自动检测并阻止各类DDoS攻击"},waf:{n:"Web应用防火墙",d:"自动过滤恶意请求"},ssl:{n:"SSL/TLS加密",d:"免费为网站启用HTTPS"},workers:{n:"Workers",d:"在全球服务器上运行JavaScript程序"},pages:{n:"Pages",d:"静态网站和无服务器函数的托管"},r2:{n:"R2存储",d:"零下载费用的对象存储"},kv:{n:"Workers KV",d:"全球分布式键值存储"},queues:{n:"Queues",d:"可靠的消息队列"},hyperdrive:{n:"Hyperdrive",d:"数据库连接优化"},
"browser-rendering":{n:"浏览器渲染",d:"无服务器浏览器自动化"},botfight:{n:"Bot Fight Mode",d:"一键检测并阻止恶意机器人"},"managed-rules":{n:"托管规则集",d:"Cloudflare管理的安全规则"},"dns-service":{n:"Cloudflare DNS",d:"高速权威DNS服务"},tunnel:{n:"Tunnel",d:"零信任安全发布服务"},spectrum:{n:"Spectrum",d:"保护非HTTP的TCP/UDP流量"},loadbalancing:{n:"负载均衡",d:"将流量分配到多台服务器"},analytics:{n:"数据分析",d:"实时流量分析"},"api-shield":{n:"API Shield",d:"API保护与管理"},images:{n:"图片优化",d:"图片缩放、转换和优化"},secrets:{n:"Secrets Store",d:"安全管理API密钥"},saas:{n:"Cloudflare for SaaS",d:"SaaS平台功能"},sso:{n:"单点登录(SSO)",d:"安全的仪表板认证"},"api-access":{n:"API访问",d:"通过API操作所有功能"}}},
ko:{cats:{core:{t:"핵심 인프라 & 성능",s:"전 세계에 걸친 서버 네트워크"},security:{t:"보안 서비스",s:"웹사이트를 전방위로 보호"},developer:{t:"개발자 플랫폼",s:"전 세계 서버에서 코드 실행"},bot:{t:"봇 대책",s:"악성 봇으로부터 보호"},dns:{t:"DNS 서비스",s:"빠르고 안전한 도메인 해석"},network:{t:"네트워킹",s:"무료로 안전한 연결 구현"},additional:{t:"기타 무료 기능",s:"더 많은 Cloudflare의 매력"}},
svcs:{cdn:{n:"글로벌 CDN",d:"전 세계 300+ 거점에서 콘텐츠를 빠르게 전달"},pagerules:{n:"페이지 규칙",d:"URL별 캐시 및 리디렉션 제어"},ddos:{n:"DDoS 방어",d:"모든 DDoS 공격을 자동 감지·차단"},waf:{n:"웹 애플리케이션 방화벽",d:"악성 요청을 자동으로 필터링"},ssl:{n:"SSL/TLS 암호화",d:"무료로 사이트를 HTTPS로 변환"},workers:{n:"Workers",d:"전 세계 서버에서 JavaScript 프로그램 실행"},pages:{n:"Pages",d:"정적 사이트 및 서버리스 함수 호스팅"},r2:{n:"R2 스토리지",d:"다운로드 요금 제로의 오브젝트 스토리지"},kv:{n:"Workers KV",d:"글로벌 분산 키-값 스토어"},queues:{n:"Queues",d:"신뢰성 높은 메시지 큐"},hyperdrive:{n:"Hyperdrive",d:"데이터베이스 연결 최적화"},
"browser-rendering":{n:"브라우저 렌더링",d:"서버리스 브라우저 자동화"},botfight:{n:"Bot Fight Mode",d:"원클릭 봇 감지·차단"},"managed-rules":{n:"관리형 규칙",d:"Cloudflare가 관리하는 보안 규칙"},"dns-service":{n:"Cloudflare DNS",d:"고속 권위 DNS 서비스"},tunnel:{n:"Tunnel",d:"제로 트러스트 서비스 공개"},spectrum:{n:"Spectrum",d:"비HTTP TCP/UDP 트래픽 보호"},loadbalancing:{n:"로드 밸런싱",d:"여러 서버로 트래픽 분산"},analytics:{n:"애널리틱스",d:"실시간 트래픽 분석"},"api-shield":{n:"API Shield",d:"API 보호 및 관리"},images:{n:"이미지 최적화",d:"이미지 리사이즈·변환·최적화"},secrets:{n:"Secrets Store",d:"API 키 안전 관리"},saas:{n:"Cloudflare for SaaS",d:"SaaS 플랫폼 기능"},sso:{n:"싱글 사인온(SSO)",d:"안전한 대시보드 인증"},"api-access":{n:"API 액세스",d:"API로 모든 기능 조작"}}}
};
/* es/fr/de/pt: use English service names */

/* ---- JAPANESE DATA (beginner-friendly, honest about costs) ---- */
function DATA_JA(){return[
{id:"core",icon:"🌐",title:"コアインフラ & パフォーマンス",subtitle:"世界中のサーバーでサイトを速くする",chipColor:"g",services:[
{id:"cdn",name:"グローバルCDN（コンテンツ配信ネットワーク）",icon:"🌍",
shortDesc:"世界300か所以上のサーバーから、訪問者に最も近い場所でページを表示します",
freeFeatures:[
"データ転送量の上限なし（どれだけアクセスされても追加料金なし）",
"サーバーが落ちてもキャッシュ（保存済みコピー）でサイトを表示し続ける機能",
"画像・CSS・JavaScriptなどのファイルを自動的にキャッシュして高速化",
"訪問者に最も近いサーバーからページを配信",
"管理画面からワンクリックでキャッシュを更新可能"],
detail:"CDNとは「コンテンツ配信ネットワーク」のことで、あなたのサイトのコピーを世界中のサーバーに置いておく仕組みです。日本の訪問者には日本のサーバーから、アメリカの訪問者にはアメリカのサーバーからページが届くので、表示が速くなります。\n\nCloudflareの無料プランでは、データ転送量に上限がありません。つまり、サイトへのアクセスがどれだけ増えても、CDNの利用に追加料金がかかることはありません。\n\n注意：CDN自体は無料ですが、Cloudflareの他の高度なキャッシュ機能（Cache Reserveなど）は有料プランのみの場合があります。",
useCases:["ブログやポートフォリオの高速表示","画像が多いサイトの軽量化","海外からのアクセス改善"]},
{id:"pagerules",name:"ページルール",icon:"📋",
shortDesc:"「このURLではキャッシュしない」「旧URLから新URLへ転送する」などの個別設定",
freeFeatures:[
"1つのドメインにつき3つまでルールを設定可能（有料プランではもっと多く設定可能）",
"キャッシュの有効期限を指定",
"古いURLから新しいURLへの自動転送（リダイレクト）",
"ブラウザ側のキャッシュ期間を指定",
"特定のページだけキャッシュをオフにする"],
detail:"ページルールとは「このURLにアクセスが来たら、こういう動作をしてね」とCloudflareに指示する機能です。例えば、管理画面（/admin/）へのアクセスはキャッシュしない設定にしたり、サイト移転時に旧URLから新URLへ自動転送する設定などができます。\n\n無料プランでは1ドメインあたり3つまで設定できます。3つ以上必要な場合は有料プランへの切り替えが必要です。",
useCases:["旧ページからの自動転送","管理画面のキャッシュ除外","特定ページの設定変更"]}
]},
{id:"security",icon:"🛡️",title:"セキュリティサービス",subtitle:"あなたのサイトをサイバー攻撃から守る",chipColor:"o",services:[
{id:"ddos",name:"DDoS攻撃の防御",icon:"🔰",
shortDesc:"大量のアクセスでサイトをダウンさせる攻撃（DDoS攻撃）を自動で防ぎます",
freeFeatures:[
"ネットワークレベルの攻撃を防御（大量のデータを送りつける攻撃など）",
"アプリケーションレベルの攻撃を防御（大量のページリクエストなど）",
"AIが攻撃パターンを学習し、新しい攻撃にも自動対応",
"設定は不要 — Cloudflareに登録するだけで自動的に有効",
"防御量の上限なし — どんな規模の攻撃も追加料金なしで防御"],
detail:"DDoS攻撃とは、世界中の大量のコンピュータから同時にアクセスを送りつけて、サーバーをパンクさせる攻撃です。個人のブログでも標的になることがあります。\n\nCloudflareの無料プランでは、この攻撃に対する防御が無制限かつ自動的に提供されます。あなた自身が設定する必要はなく、Cloudflareに登録するだけで保護が始まります。\n\n攻撃の規模に関係なく追加料金はかかりません。これは有料プランと同じレベルの防御です。",
useCases:["サイトのダウン防止","攻撃時の自動防御","安心したサイト運営"]},
{id:"waf",name:"不正アクセス防止（WAF）",icon:"🧱",
shortDesc:"Webサイトへの不正なリクエスト（ハッキング試行など）を自動で検知・ブロックします",
freeFeatures:[
"Cloudflareが用意した基本的な防御ルール（無料版）を利用可能",
"自分でカスタムルールを作成可能",
"不正アクセスをブロック、または「人間ですか？」と確認を表示",
"特定のIPアドレスからのアクセスをブロック/許可",
"短時間に大量のアクセスがあった場合の制限（レート制限）"],
detail:"WAF（Web Application Firewall）とは、Webサイトへの悪意あるリクエストを自動的にブロックする仕組みです。例えば、データベースに不正な命令を送り込む「SQLインジェクション」や、悪意のあるスクリプトを埋め込む「XSS」といった攻撃を防ぎます。\n\n無料プランでは基本的なルールセットが使えます。より高度なルール（Cloudflare Managed Ruleset、完全版OWASP Core Rulesetなど）は有料プラン限定です。\n\n専門知識がなくても、基本ルールを有効にするだけで一定の防御ができます。",
useCases:["不正なデータベース操作の防止","悪意あるスクリプトの防御","特定IPのブロック"]},
{id:"ssl",name:"通信の暗号化（HTTPS化）",icon:"🔒",
shortDesc:"サイトに「鍵マーク🔒」を付けて、訪問者との通信を暗号化します（無料）",
freeFeatures:[
"すべてのドメインにSSL証明書を無料で自動発行",
"HTTPでアクセスされたら自動的にHTTPSへ転送",
"証明書の更新も自動（手動での更新作業は不要）",
"暗号化の強度を設定可能"],
detail:"HTTPSとは、Webサイトとブラウザの間の通信を暗号化する仕組みです。ブラウザのアドレスバーに表示される「鍵マーク🔒」がこれに当たります。HTTPSにすることで、第三者に通信内容を盗み見られるリスクを減らせます。\n\nCloudflareに登録すると、SSL証明書（HTTPSに必要な電子証明書）が自動的に無料で発行されます。証明書の更新も自動で行われるため、期限切れの心配がありません。\n\n注意：Cloudflareと訪問者の間は暗号化されますが、Cloudflareとあなたのサーバーの間の暗号化は設定モードによって異なります。「Full (Strict)」モードに設定するのが最も安全です。",
useCases:["サイトのHTTPS化","検索エンジンでの評価向上","訪問者の安全性確保"]}
]},
{id:"developer",icon:"⚡",title:"開発者向けプラットフォーム",subtitle:"サーバーを自分で用意せずにプログラムを動かす",chipColor:"b",services:[
{id:"workers",name:"Workers（プログラム実行環境）",icon:"⚙️",
shortDesc:"自分のサーバーを用意しなくても、Cloudflareの世界中のサーバー上でプログラムを動かせます",
freeFeatures:[
"1日あたり10万回のリクエストまで無料（超えると有料プランが必要）",
"1回の処理あたりCPU時間10ミリ秒まで（シンプルな処理には十分）",
"1回の処理で外部サービスへ50回までアクセス可能",
"定期的にプログラムを自動実行する機能（Cronトリガー）",
"Cloudflareの他のサービス（KV・R2など）と連携可能"],
detail:"Workersとは、自分でサーバーを購入・管理しなくても、Cloudflareが世界中に持っているサーバー上であなたのプログラム（JavaScript / TypeScript）を動かせるサービスです。\n\n例えば、お問い合わせフォームの送信処理、APIの作成、ページの内容をアクセス元の国に応じて変更する、といった処理ができます。\n\n無料プランでは1日10万リクエストまで処理できます。個人プロジェクトや小規模サイトには十分ですが、アクセス数の多いサービスでは有料プラン（月$5〜）が必要になる場合があります。\n\nCPU時間は1回あたり10ミリ秒までに制限されています。画像処理や複雑な計算など重い処理には向いていません（有料プランでは上限が緩和されます）。",
useCases:["お問い合わせフォームの処理","簡単なAPIの作成","ページ内容の出し分け"]},
{id:"pages",name:"Pages（Webサイト公開サービス）",icon:"📄",
shortDesc:"GitHubにコードを送信するだけで、Webサイトが自動的に公開されます",
freeFeatures:[
"月10回までサイトの構築・更新が可能（超えると次の月まで待つか有料プランが必要）",
"月10GBまでのデータ転送量（超過分は有料）",
"10GBのファイル保存容量",
"1プロジェクトにつき100個のカスタムドメイン（独自ドメイン）",
"GitHubなどのサービスと連携して自動公開",
"1日10万リクエストまでプログラム実行も可能（Workers相当の機能）"],
detail:"Pagesは、Webサイトを簡単にインターネット上に公開できるサービスです。GitHub（プログラムの管理サービス）と連携すると、コードをGitHubに送信するだけで自動的にWebサイトが構築・公開されます。\n\nReact、Vue、Next.jsなど主要なWeb技術に対応しています。\n\n無料プランの制限として、月10回までのビルド（サイトの構築作業）、月10GBまでのデータ転送量があります。個人ブログやポートフォリオには十分ですが、頻繁にサイトを更新する場合やアクセスが多い場合は有料プランの検討が必要です。",
useCases:["ポートフォリオサイトの公開","個人ブログの運営","Webアプリの公開"]},
{id:"r2",name:"R2（ファイル保存サービス）",icon:"🗄️",
shortDesc:"画像や動画などのファイルをクラウドに保存。データの取り出しに料金がかからないのが特徴です",
freeFeatures:[
"10GBまでのファイル保存が無料（超えると1GBあたり約$0.015/月）",
"データの取り出し（ダウンロード）に料金がかからない（多くの他社サービスではこの部分が有料）",
"ファイルの保存・取得・削除などの操作が月100万回まで無料（超過分は有料）",
"月100GBまでのデータ転送が無料",
"Amazon S3と同じ方法（API）で操作できるので、既存のツールがそのまま使える"],
detail:"R2は、画像・動画・文書などのファイルをインターネット上に保存できるサービスです。\n\n最大の特徴は「エグレス料金ゼロ」です。エグレス料金とは、保存したデータを取り出す（ダウンロードする）ときにかかる料金のことです。多くの他社クラウドストレージでは、データを外部から読み取るたびに料金がかかりますが、R2ではこの料金がかかりません。\n\n無料プランの制限：\n・保存容量：10GBまで無料（超過分は有料）\n・操作回数：月100万回まで無料（超過分は有料）\n・データ転送：月100GBまで無料\n\n10GBを超える保存や、月100万回を超える操作には料金が発生しますのでご注意ください。",
useCases:["Webサイト用の画像保存","データのバックアップ","ユーザーがアップロードしたファイルの保管"]},
{id:"kv",name:"KV（シンプルなデータ保存）",icon:"🔑",
shortDesc:"「名前」と「値」のペアでデータを保存。設定値やちょっとしたデータの管理に便利です",
freeFeatures:[
"1日10万回までのデータ読み取り（超過分は有料）",
"1日1,000回までのデータ書き込み（超過分は有料）",
"1GBまでのデータ保存（超過分は有料）",
"データに有効期限を設定可能",
"Workersのプログラムから直接利用可能"],
detail:"KV（Key-Value）は、「名前（キー）」と「値（バリュー）」の組み合わせでデータを保存するシンプルな仕組みです。例えば、「site_name」という名前に「私のブログ」という値を保存するイメージです。\n\nサイトの設定値や、ユーザーの設定、一時的なデータの保存などに向いています。\n\n無料プランの制限：読み取りは1日10万回、書き込みは1日1,000回、保存容量は1GBまでです。この範囲を超える場合は有料プランが必要です。\n\n注意：データの更新が世界中のサーバーに反映されるまで最大60秒程度かかる場合があります（結果整合性）。リアルタイムでの正確な同期が必要な用途には向きません。",
useCases:["サイトの設定値の保存","一時データの管理","プログラムからの簡単なデータ参照"]},
{id:"queues",name:"Queues（順番待ち処理）",icon:"📬",
shortDesc:"メール送信や画像処理など、時間がかかる作業を「順番待ちリスト」に入れて確実に処理します",
freeFeatures:[
"最大10,000個の順番待ちリスト（キュー）を作成可能",
"1日10,000回までの操作（超過分は有料）",
"イベント通知の登録は無制限",
"メッセージは24時間保持される",
"処理に失敗したメッセージの自動再試行"],
detail:"Queuesは「順番待ちリスト」のようなサービスです。例えば、100人がお問い合わせフォームを送信した場合、100通のメールを同時に送るとサーバーに大きな負荷がかかります。Queuesを使えば、メール送信の依頼を順番待ちリストに入れて、1通ずつ確実に処理できます。\n\n無料プランでは1日10,000回の操作まで使えます。操作回数がこれを超える場合は有料プランが必要です。\n\nメッセージは24時間保持され、処理に失敗した場合は自動的に再試行されるので、処理の取りこぼしを防げます。",
useCases:["メール送信の順番待ち処理","画像加工の非同期処理","確実にこなしたい処理の管理"]},
{id:"hyperdrive",name:"Hyperdrive（データベース接続の高速化）",icon:"🚀",
shortDesc:"Workersからデータベースへの接続を高速化する仕組みです",
freeFeatures:[
"Workers無料プランに含まれている",
"データベースへの接続を使い回して効率化（コネクションプーリング）",
"通信の待ち時間を削減",
"PostgreSQL / MySQL に対応"],
detail:"通常、Workersのプログラムからデータベースに接続するたびに、新しい接続を確立する必要があり、これに時間がかかります。Hyperdriveは接続を使い回す（プーリングする）ことで、この待ち時間を大幅に短縮します。\n\nWorkers無料プランに含まれているため、追加料金なしで利用できます。ただし、Workers自体の無料プラン制限（1日10万リクエストなど）は適用されます。",
useCases:["データベースを使うWebアプリの高速化","接続数の削減","プログラムからの効率的なDB利用"]},
{id:"browser-rendering",name:"ブラウザ自動操作",icon:"🖥️",
shortDesc:"Cloudflare上でWebブラウザを自動操作。スクリーンショット撮影やPDF生成などに使えます",
freeFeatures:[
"1日あたり10分間のブラウザ利用（超過分は有料）",
"同時に3つのブラウザを使用可能",
"Webページのスクリーンショット撮影",
"HTMLからPDFを生成",
"Webページのデータ収集（1日5回まで、各100ページまで）"],
detail:"ブラウザ自動操作は、Cloudflareのサーバー上でChromeブラウザを動かして、Webページの操作を自動化できるサービスです。自分のパソコンにブラウザ環境を用意しなくても、スクリーンショットの撮影やPDFの生成ができます。\n\n無料プランでは1日10分間までの利用に制限されています。それ以上使う場合は有料プランが必要です。",
useCases:["Webページの画面キャプチャ","HTMLからPDFへの変換","サイトの定期監視"]}
]},
{id:"bot",icon:"🤖",title:"Bot（自動プログラム）対策",subtitle:"悪質な自動アクセスからサイトを守る",chipColor:"r",services:[
{id:"botfight",name:"Bot Fight Mode",icon:"🥊",
shortDesc:"悪質な自動プログラム（Bot）を検知してブロック。ワンクリックで有効にできます",
freeFeatures:[
"既知の悪質Botのアクセスパターンを自動検知",
"検知したBotに対して負荷の高い検証を要求（人間には影響なし）",
"管理画面からワンクリックでON/OFF可能"],
detail:"Bot（ボット）とは、人間の代わりに自動でWebサイトにアクセスするプログラムのことです。検索エンジンのクローラーのように有益なBotもありますが、スパム投稿や不正アクセスを行う悪質なBotも存在します。\n\nBot Fight Modeは、悪質なBotを自動的に検知してブロックするシンプルな機能です。管理画面からワンクリックで有効にできます。\n\n注意：Bot Fight Modeは細かいカスタマイズができません。正規の監視サービスなど自動アクセスが必要な場合に誤検知される可能性があります。細かい制御が必要な場合は有料の「Bot Management」の検討が必要です。",
useCases:["スパムコメントの防止","不正アクセスの削減","自動データ収集の防止"]},
{id:"managed-rules",name:"マネージドルールセット（Cloudflare管理のセキュリティルール）",icon:"📜",
shortDesc:"Cloudflareのセキュリティ専門家が作成・更新するルールで、よくある攻撃を防ぎます",
freeFeatures:[
"無料版のルールセットが利用可能",
"Botスコアによる検知",
"基本的なWeb攻撃パターンの検知（限定版）",
"漏洩した認証情報のチェック（限定版）"],
detail:"マネージドルールセットは、Cloudflareのセキュリティ専門チームが作成・維持している防御ルール集です。よくあるWeb攻撃のパターンを網羅しており、有効にするだけで基本的な防御ができます。\n\n無料プランでは基本版のルールセットが使えます。より高度なルール（Cloudflare完全版、OWASP完全版など）は有料プラン限定です。",
useCases:["基本的な攻撃防御","専門知識なしでのセキュリティ確保","よくある攻撃パターンの検知"]}
]},
{id:"dns",icon:"📡",title:"DNSサービス",subtitle:"ドメイン名（例：example.com）を管理する",chipColor:"t",services:[
{id:"dns-service",name:"Cloudflare DNS（ドメインの管理・名前解決）",icon:"🌐",
shortDesc:"ドメイン名（example.com）とサーバーのアドレスを結びつけるサービス。非常に高速です",
freeFeatures:[
"1つのドメインにつき10万件までのDNSレコード",
"1日あたり500万回までの名前解決リクエスト（超過分は対応要相談）",
"DNSSEC（DNSの改ざん防止機能）に対応",
"すべてのレコードタイプに対応（A / AAAA / CNAME / MX / TXT など）",
"DNSファイアウォールで上流のネームサーバーも保護"],
detail:"DNSとは「インターネットの電話帳」のような仕組みです。あなたが「example.com」とブラウザに入力すると、DNSサーバーがそのドメインに対応するサーバーの住所（IPアドレス）を教えてくれます。\n\nCloudflareのDNSは応答速度が非常に速く、世界中どこからでも素早くドメイン名を解決できます。DNSSEC（DNSの内容が改ざんされていないか検証する仕組み）にも対応しています。\n\n無料プランでも、1日あたり500万回のリクエストに対応できるため、ほとんどのWebサイトには十分です。",
useCases:["ドメインの管理","メール送信の設定（MX / SPF / DKIM）","DNSの安全性向上"]}
]},
{id:"network",icon:"🔗",title:"ネットワーキング",subtitle:"安全な接続を無料で作る",chipColor:"p",services:[
{id:"tunnel",name:"Tunnel（安全なトンネル接続）",icon:"🚇",
shortDesc:"自宅のパソコンやサーバーをインターネットに安全に公開。ルーターの面倒な設定は不要です",
freeFeatures:[
"作成できるトンネルの数に制限なし",
"データ転送量に制限なし",
"すべてのアクセスを検証してから通す安全な方式",
"通信は自動的にHTTPS（暗号化）される",
"ルーターのポート開放が不要（セキュリティリスクを低減）"],
detail:"Tunnelは、自宅のパソコンやサーバーで動かしているWebアプリなどを、インターネット上に安全に公開できるサービスです。\n\n通常、自宅サーバーを公開するにはルーターの「ポート開放」という設定が必要で、これにはセキュリティリスクが伴います。Tunnelを使えば、Cloudflareのネットワークを経由して接続されるため、ポート開放が不要で、あなたのサーバーのIPアドレスも外部に見えません。\n\n無料プランでも作成数・転送量ともに制限がなく、非常に便利なサービスです。",
useCases:["自宅サーバーの安全な公開","開発中のWebアプリを他の人に見せる","社内アプリへの安全なリモートアクセス"]},
{id:"spectrum",name:"Spectrum（HTTP以外の通信の保護）",icon:"📡",
shortDesc:"ゲームサーバーやメールサーバーなど、Webページ以外の通信もCloudflareで保護できます",
freeFeatures:[
"TCP / UDPプロトコルの通信をCloudflare経由で中継",
"Web以外のサービスにもDDoS攻撃の防御を適用",
"すべてのTCPポートに対応",
"サーバーのIPアドレスを隠蔽"],
detail:"通常のWebサイト（HTTP/HTTPS）以外にも、ゲームサーバー、メールサーバー、IoTデバイスなど様々な通信プロトコルがあります。Spectrumはこれらの通信にもCloudflareの保護（DDoS防御やIP隠蔽）を適用できるサービスです。\n\n注意：無料プランで利用できる範囲には制限がある場合があります。大規模な利用には有料プランが必要になることがあります。",
useCases:["ゲームサーバーの保護","メールサーバーのDDoS対策","IoTデバイスの通信保護"]},
{id:"loadbalancing",name:"ロードバランシング（負荷分散）",icon:"⚖️",
shortDesc:"複数のサーバーにアクセスを振り分けて、1台に負荷が集中するのを防ぎます",
freeFeatures:[
"基本的なアクセス分散機能",
"アクセス元の地域に応じた振り分け",
"各サーバーが正常に動いているか定期的に確認（ヘルスチェック）",
"DNS方式での負荷分散"],
detail:"ロードバランシング（負荷分散）とは、Webサイトへのアクセスを複数のサーバーに振り分ける仕組みです。1台のサーバーに負荷が集中するのを防ぎ、サーバーに障害が起きた場合は自動的に別のサーバーに切り替えます。\n\n注意：無料プランで使えるのは基本的な機能のみです。高度な負荷分散（重み付け、カスタムルールなど）は有料プランが必要です。",
useCases:["複数サーバーへの負荷分散","サーバー障害時の自動切り替え","地域別のアクセス振り分け"]}
]},
{id:"additional",icon:"✨",title:"その他の無料機能",subtitle:"まだまだあるCloudflareの便利な機能",chipColor:"a",services:[
{id:"analytics",name:"アナリティクス（アクセス分析）",icon:"📊",
shortDesc:"サイトへのアクセス状況、攻撃の有無、表示速度などをリアルタイムで確認できます",
freeFeatures:["リアルタイムのアクセス状況表示","セキュリティイベントの分析","ページ表示速度の分析","Botのアクセス状況の分析"],
detail:"Cloudflareのアナリティクスは、あなたのサイトへのアクセスを分析するツールです。Cloudflareのネットワーク上で計測するため、ブラウザでJavaScriptが無効にされていてもデータを取得できます。\n\n無料プランでも基本的な分析機能が使えます。より詳細な分析やログの長期保存は有料プラン限定です。",
useCases:["アクセス傾向の把握","攻撃の検知","サイト速度の改善"]},
{id:"api-shield",name:"API Shield（APIの保護）",icon:"🛡️",
shortDesc:"APIへの不正なリクエストを検知して防ぐ機能です",
freeFeatures:["APIのエンドポイント管理（無料）","リクエスト形式の検証（スキーマバリデーション、無料）"],
detail:"API Shieldは、あなたが公開しているAPI（プログラム同士が通信するための仕組み）を不正利用から守るサービスです。\n\n無料プランではエンドポイント管理とスキーマバリデーション（リクエストが正しい形式かチェック）が使えます。API自動発見や不正アクセスの詳細分析は有料プラン限定です。",
useCases:["APIの保護","不正なリクエストの検知","API管理"]},
{id:"images",name:"画像の最適化",icon:"🖼️",
shortDesc:"画像を自動的にリサイズ・変換・圧縮して、ページの読み込みを速くします",
freeFeatures:["画像変換機能へのアクセス","R2に保存した画像の最適化","リサイズ・トリミング・フォーマット変換","ブラウザに合わせた最適な画像サイズ配信"],
detail:"Cloudflare Imagesは、画像をリアルタイムでリサイズ（サイズ変更）・圧縮して配信するサービスです。例えば、スマートフォンには小さい画像、パソコンには大きい画像を自動的に出し分けて、ページの読み込み速度を改善できます。\n\n注意：画像の変換（トランスフォーム）機能は無料で使える部分がありますが、Cloudflare Imagesのストレージ（画像の保存）自体は有料サービスです。R2に保存した画像の変換は無料枠で利用できます。",
useCases:["画像の自動圧縮・変換","サムネイルの自動生成","スマートフォン向け画像の最適化"]},
{id:"secrets",name:"Secrets Store（秘密情報の管理）",icon:"🔐",
shortDesc:"APIキーやパスワードなどの秘密情報を安全に保存・管理できます",
freeFeatures:["アカウント単位の変数保存","安全に暗号化された保存","Workersのプログラムから利用可能","開発用と本番用で異なる値を設定可能"],
detail:"Secrets Storeは、プログラムで使うAPIキー（外部サービスに接続するためのパスワードのようなもの）やパスワードなどの秘密情報を安全に管理するサービスです。\n\nプログラムのソースコードに直接パスワードを書き込むのはセキュリティ上危険です。Secrets Storeを使えば、秘密情報をコードとは別の安全な場所に保存できます。",
useCases:["APIキーの安全な管理","開発用と本番用の設定分離","秘密情報の安全な保管"]},
{id:"saas",name:"Cloudflare for SaaS",icon:"☁️",
shortDesc:"あなたのサービスの顧客が独自ドメインを使う場合に、SSL証明書やDNSの管理を自動化します",
freeFeatures:["SaaSドメイン対応","分析レポート","顧客のカスタムSSL/TLS証明書","カスタムDNS管理"],
detail:"Cloudflare for SaaSは、あなたがWebサービス（SaaS）を提供している場合に、顧客ごとのカスタムドメイン対応を簡単にする機能です。顧客が独自ドメインを使う際のSSL証明書発行やDNS管理を自動化できます。\n\nこの機能は主にWebサービスを提供する事業者向けです。一般的な個人サイトでは使用する場面は少ないでしょう。",
useCases:["複数の顧客にサービスを提供","顧客の独自ドメイン対応","自動的なSSL証明書管理"]},
{id:"sso",name:"シングルサインオン（SSO）",icon:"🔓",
shortDesc:"1つのログイン情報でCloudflareダッシュボードに安全にアクセスできます",
freeFeatures:["全ユーザーがSSO利用可能","SAML 2.0 / OIDC / LDAP対応","多要素認証（MFA）対応"],
detail:"SSO（シングルサインオン）とは、1つのログイン情報で複数のサービスにアクセスできる仕組みです。企業で使っているIDシステム（Google WorkspaceやOktaなど）と連携して、Cloudflareのダッシュボードに安全にログインできます。\n\n以前は有料機能でしたが、現在はすべてのプランで無料で使えます。",
useCases:["企業のID管理システムとの連携","ダッシュボードへの安全なアクセス","多要素認証の導入"]},
{id:"api-access",name:"APIアクセス",icon:"🔌",
shortDesc:"Cloudflareの全機能をプログラムから操作できます。自動化やシステム連携に便利です",
freeFeatures:["全製品の機能をAPI経由で利用可能","APIトークン（認証キー）の発行","公式SDK（開発キット）が利用可能"],
detail:"Cloudflareの管理画面（ダッシュボード）で行える操作はすべて、API（プログラムからアクセスする仕組み）を通じても実行できます。\n\nこれにより、DNS設定の変更やキャッシュの削除などを自動化したり、自社のシステムに組み込んだりすることが可能です。\n\n注意：APIには利用回数の制限（レート制限）があります。短時間に大量のリクエストを送ると一時的にブロックされる場合があります。",
useCases:["設定変更の自動化","独自の管理画面の構築","CI/CD（自動デプロイ）との連携"]}
]}
];}

/* ---- ENGLISH DATA ---- */
function DATA_EN(){return[
{id:"core",icon:"🌐",title:"Core Infrastructure & Performance",subtitle:"A global server network that makes your site faster",chipColor:"g",services:[
{id:"cdn",name:"Global CDN (Content Delivery Network)",icon:"🌍",
shortDesc:"Delivers your pages from the server closest to each visitor, across 300+ locations worldwide",
freeFeatures:["Unlimited data transfer (no extra charges no matter how much traffic you get)","Your site stays visible even if your own server goes down (cached copy is shown)","Automatic caching of images, CSS, JavaScript, and other files","Content served from the nearest server to each visitor","One-click cache clearing from the dashboard"],
detail:"A CDN (Content Delivery Network) stores copies of your website on servers around the world. When someone visits your site, they get the copy from the server closest to them, making pages load faster.\n\nCloudflare's free plan includes unlimited data transfer — you won't be charged extra no matter how many visitors you get.\n\nNote: The CDN itself is free, but some advanced caching features (like Cache Reserve) may require a paid plan.",
useCases:["Making blogs and portfolios faster","Reducing load times for image-heavy sites","Improving access speed for international visitors"]},
{id:"pagerules",name:"Page Rules",icon:"📋",
shortDesc:"Set custom behaviors for specific URLs — like 'don't cache this page' or 'redirect old URLs'",
freeFeatures:["Up to 3 custom rules per domain (paid plans allow more)","Set cache expiration times","Create URL redirects","Set browser cache duration","Turn caching on/off for specific pages"],
detail:"Page Rules let you tell Cloudflare 'when someone visits this URL, do this specific thing.' For example, you can skip caching for your admin pages, or automatically redirect visitors from an old URL to a new one.\n\nThe free plan allows 3 rules per domain. If you need more, a paid plan is required.",
useCases:["Redirecting old URLs to new ones","Excluding admin pages from caching","Custom settings for specific pages"]}
]},
{id:"security",icon:"🛡️",title:"Security Services",subtitle:"Protect your site from cyber attacks",chipColor:"o",services:[
{id:"ddos",name:"DDoS Attack Protection",icon:"🔰",
shortDesc:"Automatically detects and blocks attacks that try to take your site offline by flooding it with traffic",
freeFeatures:["Protection against network-level floods (massive data sent to overwhelm your server)","Protection against application-level attacks (massive page requests)","AI learns attack patterns and adapts to new threats automatically","No setup needed — protection starts automatically when you sign up","No limit on attack size — any scale of attack is handled at no extra cost"],
detail:"A DDoS (Distributed Denial of Service) attack is when thousands of computers send traffic to your site at the same time, trying to crash it. Even personal blogs can be targeted.\n\nCloudflare provides unlimited, automatic DDoS protection on all plans, including free. You don't need to configure anything — just sign up and you're protected.\n\nThere are no extra charges regardless of attack size. This is the same level of protection paid plans receive.",
useCases:["Preventing site downtime","Automatic attack response","Peace of mind for site owners"]},
{id:"waf",name:"Web Application Firewall (WAF)",icon:"🧱",
shortDesc:"Automatically detects and blocks malicious requests like hacking attempts",
freeFeatures:["Basic protection rules maintained by Cloudflare (free version)","Create your own custom rules","Block suspicious traffic or show verification challenges","Block or allow specific IP addresses","Rate limiting for excessive requests"],
detail:"A WAF (Web Application Firewall) automatically blocks malicious requests to your website. It protects against common attacks like SQL injection (sending harmful commands to your database) and XSS (injecting malicious scripts).\n\nThe free plan includes a basic rule set. More advanced rules (full Cloudflare Managed Ruleset, complete OWASP Core Ruleset) are available only on paid plans.\n\nEven without security expertise, enabling the basic rules provides meaningful protection.",
useCases:["Blocking database attacks","Preventing malicious script injection","Blocking specific IP addresses"]},
{id:"ssl",name:"Communication Encryption (HTTPS)",icon:"🔒",
shortDesc:"Add the lock icon 🔒 to your site and encrypt communication with visitors — for free",
freeFeatures:["Free SSL certificates automatically issued for all domains","Automatic redirect from HTTP to HTTPS","Certificates renew automatically (no manual work needed)","Configurable encryption strength"],
detail:"HTTPS encrypts the communication between your website and your visitors' browsers. The lock icon 🔒 in the address bar means the connection is encrypted, preventing third parties from eavesdropping.\n\nWhen you sign up for Cloudflare, an SSL certificate is automatically issued for free. Renewals are also automatic, so you never have to worry about expiration.\n\nNote: Communication between Cloudflare and your visitors is always encrypted. Encryption between Cloudflare and your own server depends on your settings — 'Full (Strict)' mode is the most secure option.",
useCases:["Making your site HTTPS","Improving search engine ranking","Increasing visitor trust"]}
]},
{id:"developer",icon:"⚡",title:"Developer Platform",subtitle:"Run code without managing your own servers",chipColor:"b",services:[
{id:"workers",name:"Workers (Code Execution)",icon:"⚙️",
shortDesc:"Run your programs on Cloudflare's worldwide servers — no need to buy or manage your own server",
freeFeatures:["Up to 100,000 requests per day for free (paid plan needed beyond this)","Up to 10ms CPU time per request (enough for simple tasks)","Up to 50 calls to external services per request","Schedule programs to run automatically at set times (Cron Triggers)","Connect with other Cloudflare services (KV, R2, etc.)"],
detail:"Workers lets you run your code (JavaScript/TypeScript) on Cloudflare's servers around the world without buying or managing your own server.\n\nYou can build contact form handlers, APIs, or customize page content based on the visitor's location.\n\nFree plan: 100,000 requests/day. This is enough for personal projects and small sites, but high-traffic services may need a paid plan (starting at $5/month).\n\nCPU time is limited to 10ms per request. Heavy processing like image manipulation may not fit within this limit (paid plans have higher limits).",
useCases:["Processing contact forms","Building simple APIs","Customizing page content"]},
{id:"pages",name:"Pages (Website Hosting)",icon:"📄",
shortDesc:"Send your code to GitHub and your website is automatically published — no server setup needed",
freeFeatures:["Up to 10 site builds per month (wait until next month or upgrade if exceeded)","Up to 10GB data transfer per month (overage is paid)","10GB file storage","Up to 100 custom domains per project","Automatic publishing via GitHub/GitLab/Bitbucket integration","Program execution up to 100K requests/day (same as Workers)"],
detail:"Pages lets you publish websites easily. Connect it to GitHub (a code management service) and every time you send code to GitHub, your site is automatically built and published.\n\nIt supports popular web technologies like React, Vue, and Next.js.\n\nFree plan limits: 10 builds per month, 10GB data transfer per month. This is enough for personal blogs and portfolios, but frequent updaters or high-traffic sites may need a paid plan.",
useCases:["Publishing portfolio sites","Running a personal blog","Deploying web applications"]},
{id:"r2",name:"R2 (File Storage)",icon:"🗄️",
shortDesc:"Store files in the cloud. Unlike many other services, downloading your files costs nothing",
freeFeatures:["10GB free storage (beyond this: ~$0.015/GB/month)","No download fees (many other services charge for this)","Up to 1 million file operations per month free (overage is paid)","Up to 100GB data transfer per month free","Compatible with Amazon S3 tools and SDKs"],
detail:"R2 is a cloud storage service for files like images, videos, and documents.\n\nIts biggest advantage is zero egress fees. 'Egress' means downloading or reading stored data. Many other cloud storage services charge you every time data is read, but R2 doesn't.\n\nFree plan limits:\n• Storage: 10GB free (overage is paid)\n• Operations: 1 million/month free (overage is paid)\n• Data transfer: 100GB/month free\n\nIf you exceed 10GB of storage or 1 million operations per month, charges apply.",
useCases:["Storing images for websites","Data backups","Storing user-uploaded files"]},
{id:"kv",name:"KV (Simple Data Storage)",icon:"🔑",
shortDesc:"Store data as name-value pairs. Great for settings, preferences, and small data lookups",
freeFeatures:["100,000 reads per day (overage is paid)","1,000 writes per day (overage is paid)","1GB storage (overage is paid)","Set expiration times on data","Access directly from Workers programs"],
detail:"KV (Key-Value) stores data as pairs of names and values. For example, storing 'site_name' = 'My Blog'.\n\nIt's great for site settings, user preferences, and cached data.\n\nFree plan limits: 100K reads/day, 1K writes/day, 1GB storage. Exceeding these requires a paid plan.\n\nNote: Updates may take up to 60 seconds to appear globally (eventual consistency). Not suitable for real-time synchronization needs.",
useCases:["Storing site settings","Temporary data management","Quick data lookups from programs"]},
{id:"queues",name:"Queues (Task Queuing)",icon:"📬",
shortDesc:"Put time-consuming tasks in a queue to process them reliably, one by one",
freeFeatures:["Up to 10,000 queues","10,000 operations per day (overage is paid)","Unlimited event subscriptions","Messages kept for 24 hours","Automatic retry for failed tasks"],
detail:"Queues works like a waiting list for tasks. If 100 people submit a contact form, sending 100 emails simultaneously could overwhelm your system. With Queues, email tasks go into a list and are processed one at a time.\n\nFree plan: 10,000 operations/day. Beyond this, a paid plan is needed.\n\nMessages are kept for 24 hours and automatically retried if processing fails.",
useCases:["Email sending queues","Background image processing","Reliable task processing"]},
{id:"hyperdrive",name:"Hyperdrive (Database Speed-Up)",icon:"🚀",
shortDesc:"Makes database connections from Workers programs faster by reusing connections",
freeFeatures:["Included with Workers free plan","Reuses database connections for efficiency (connection pooling)","Reduces waiting time","Supports PostgreSQL and MySQL"],
detail:"Normally, every time a Workers program connects to a database, it has to establish a new connection, which takes time. Hyperdrive reuses connections (pooling) to significantly reduce this delay.\n\nIt's included with the Workers free plan at no extra cost. However, Workers' own free plan limits (100K requests/day, etc.) still apply.",
useCases:["Speeding up database-backed apps","Reducing connection overhead","Efficient database access from programs"]},
{id:"browser-rendering",name:"Browser Automation",icon:"🖥️",
shortDesc:"Operate a web browser on Cloudflare's servers — take screenshots, generate PDFs, and more",
freeFeatures:["10 minutes of browser time per day (overage is paid)","Up to 3 simultaneous browsers","Website screenshot capture","PDF generation from HTML","Web crawling (5 times/day, up to 100 pages each)"],
detail:"Browser Automation lets you run a Chrome browser on Cloudflare's servers to automate web page tasks. You can capture screenshots and generate PDFs without setting up a browser environment on your own computer.\n\nFree plan: limited to 10 minutes per day. More usage requires a paid plan.",
useCases:["Taking web page screenshots","Converting HTML to PDF","Monitoring website changes"]}
]},
{id:"bot",icon:"🤖",title:"Bot Protection",subtitle:"Block malicious automated traffic",chipColor:"r",services:[
{id:"botfight",name:"Bot Fight Mode",icon:"🥊",
shortDesc:"Detect and block malicious bots with one click",
freeFeatures:["Automatically detects known malicious bot patterns","Issues computational challenges to suspected bots (no effect on real visitors)","One-click toggle in the dashboard"],
detail:"A 'bot' is a program that automatically accesses websites. Some bots are helpful (like search engine crawlers), but others spam, scrape content, or attempt unauthorized access.\n\nBot Fight Mode automatically detects and blocks malicious bots. Enable it with one click from your dashboard.\n\nNote: Bot Fight Mode can't be fine-tuned. Legitimate automated services (monitoring tools, etc.) might be incorrectly blocked. For granular control, the paid 'Bot Management' feature is needed.",
useCases:["Blocking spam bots","Preventing content scraping","Reducing unauthorized access"]},
{id:"managed-rules",name:"Managed Rulesets",icon:"📜",
shortDesc:"Security rules created and maintained by Cloudflare's experts to block common attacks",
freeFeatures:["Free version of the ruleset available","Bot score detection","Basic web attack pattern detection (limited)","Leaked credential checking (limited)"],
detail:"Managed Rulesets are collections of security rules created by Cloudflare's security team. They cover common web attack patterns and provide basic protection just by enabling them.\n\nThe free plan includes a basic ruleset. Advanced rulesets (full Cloudflare version, complete OWASP rules) require paid plans.",
useCases:["Basic attack protection","Security without expertise","Common attack pattern detection"]}
]},
{id:"dns",icon:"📡",title:"DNS Service",subtitle:"Manage your domain name (e.g., example.com)",chipColor:"t",services:[
{id:"dns-service",name:"Cloudflare DNS",icon:"🌐",
shortDesc:"Connects your domain name (example.com) to your server's address. Very fast response times",
freeFeatures:["Up to 100,000 DNS records per domain","Up to 5 million lookups per day","DNSSEC (protection against DNS tampering)","All record types supported (A, AAAA, CNAME, MX, TXT, etc.)","DNS Firewall protection"],
detail:"DNS is like the internet's phone book. When you type 'example.com' in your browser, a DNS server tells your browser the server's address (IP address) for that domain.\n\nCloudflare's DNS is very fast, resolving domain names quickly from anywhere in the world. It supports DNSSEC (verification that DNS data hasn't been tampered with).\n\nThe free plan handles up to 5 million lookups per day, which is more than enough for most websites.",
useCases:["Domain management","Email configuration (MX/SPF/DKIM)","Improving DNS security"]}
]},
{id:"network",icon:"🔗",title:"Networking",subtitle:"Create secure connections for free",chipColor:"p",services:[
{id:"tunnel",name:"Tunnel (Secure Connection)",icon:"🚇",
shortDesc:"Safely expose your home computer or server to the internet without complicated router settings",
freeFeatures:["Unlimited number of tunnels","Unlimited data transfer","All access is verified before being allowed through","Automatic HTTPS encryption","No router port forwarding needed (reduces security risk)"],
detail:"Tunnel lets you safely expose web apps running on your home computer or server to the internet.\n\nNormally, exposing a home server requires 'port forwarding' on your router, which creates security risks. With Tunnel, traffic goes through Cloudflare's network, so no ports need to be opened and your server's IP address stays hidden.\n\nThe free plan has no limits on tunnels or data transfer — it's an exceptionally useful service.",
useCases:["Safely sharing a home server","Showing work-in-progress to others","Remote access to internal apps"]},
{id:"spectrum",name:"Spectrum (Non-Web Traffic Protection)",icon:"📡",
shortDesc:"Protect game servers, email servers, and other non-web services through Cloudflare",
freeFeatures:["Route TCP/UDP traffic through Cloudflare","DDoS protection for non-web services","All TCP ports supported","Hide your server's IP address"],
detail:"Besides regular websites (HTTP/HTTPS), there are game servers, email servers, IoT devices, and other services using different communication protocols. Spectrum extends Cloudflare's protection (DDoS defense, IP hiding) to these services.\n\nNote: Free plan availability may have limitations. Large-scale use may require a paid plan.",
useCases:["Protecting game servers","DDoS protection for email servers","Securing IoT device communications"]},
{id:"loadbalancing",name:"Load Balancing",icon:"⚖️",
shortDesc:"Distribute traffic across multiple servers so no single server gets overwhelmed",
freeFeatures:["Basic traffic distribution","Geographic routing (send visitors to nearest server)","Health checks (regular verification that each server is working)","DNS-based load balancing"],
detail:"Load balancing distributes website traffic across multiple servers, preventing any single server from being overwhelmed. It monitors each server's health and automatically redirects traffic if one goes down.\n\nNote: Only basic features are available on the free plan. Advanced load balancing (weighted routing, custom rules) requires a paid plan.",
useCases:["Distributing traffic across servers","Automatic failover","Geographic routing"]}
]},
{id:"additional",icon:"✨",title:"Other Free Features",subtitle:"Even more useful Cloudflare tools",chipColor:"a",services:[
{id:"analytics",name:"Analytics",icon:"📊",shortDesc:"See real-time data on site traffic, attacks, and performance",
freeFeatures:["Real-time traffic overview","Security event analysis","Page speed analysis","Bot traffic analysis"],
detail:"Cloudflare Analytics shows you data about your site's traffic, security, and performance. Because it measures at the network level, it can collect data even when JavaScript is blocked.\n\nBasic analytics are free. Detailed analysis and long-term log storage require paid plans.",
useCases:["Understanding traffic patterns","Detecting attacks","Improving site speed"]},
{id:"api-shield",name:"API Shield",icon:"🛡️",shortDesc:"Protect your APIs from misuse",
freeFeatures:["API endpoint management (free)","Request format validation (free)"],
detail:"API Shield protects APIs (interfaces that programs use to communicate) from misuse.\n\nFree features: endpoint management and schema validation (checking that requests have the correct format). Automatic API discovery and detailed abuse analysis require paid plans.",
useCases:["Protecting API endpoints","Validating requests","API management"]},
{id:"images",name:"Image Optimization",icon:"🖼️",shortDesc:"Automatically resize, convert, and compress images for faster page loads",
freeFeatures:["Access to image transformation features","Optimize images stored in R2","Resize, crop, and format conversion","Serve the right image size for each device"],
detail:"Cloudflare Images can resize and compress images in real-time. For example, it can automatically serve smaller images to mobile phones and larger ones to desktops.\n\nNote: Image transformation features have free access, but Cloudflare Images storage itself is a paid service. Transforming images stored in R2 can be done within the free tier.",
useCases:["Automatic image compression","Thumbnail generation","Mobile-optimized images"]},
{id:"secrets",name:"Secrets Store",icon:"🔐",shortDesc:"Safely store API keys, passwords, and other sensitive information",
freeFeatures:["Account-level variable storage","Encrypted storage","Accessible from Workers programs","Different values for development and production"],
detail:"Secrets Store safely manages sensitive information like API keys and passwords that your programs need.\n\nHardcoding passwords in source code is a security risk. Secrets Store keeps sensitive data separate from your code in a secure location.",
useCases:["Safe API key management","Separating dev and production settings","Secure secret storage"]},
{id:"saas",name:"Cloudflare for SaaS",icon:"☁️",shortDesc:"Automate SSL certificates and DNS for your customers' custom domains",
freeFeatures:["SaaS domain support","Analytics and reporting","Customer SSL/TLS certificates","Custom DNS management"],
detail:"Cloudflare for SaaS helps if you provide a web service and your customers want to use their own domain names. It automates SSL certificate issuance and DNS management for each customer's domain.\n\nThis is mainly for web service providers. Typical personal sites won't need this feature.",
useCases:["Serving multiple customers","Custom domain support","Automated SSL management"]},
{id:"sso",name:"Single Sign-On (SSO)",icon:"🔓",shortDesc:"Log in to Cloudflare's dashboard securely with your company's identity system",
freeFeatures:["SSO available for all users","Supports SAML 2.0, OIDC, LDAP","Multi-factor authentication (MFA) support"],
detail:"SSO (Single Sign-On) lets you log in to multiple services with one set of credentials. You can connect your company's identity system (Google Workspace, Okta, etc.) to Cloudflare's dashboard.\n\nThis was previously a paid feature but is now free on all plans.",
useCases:["Company identity system integration","Secure dashboard access","Enforcing multi-factor authentication"]},
{id:"api-access",name:"API Access",icon:"🔌",shortDesc:"Control all Cloudflare features programmatically — great for automation",
freeFeatures:["Full API access to all products","API token generation","Official SDKs available"],
detail:"Everything you can do in Cloudflare's dashboard can also be done through the API (a way for programs to interact with Cloudflare).\n\nThis lets you automate DNS changes, cache clearing, and more, or integrate Cloudflare into your own systems.\n\nNote: The API has rate limits. Sending too many requests in a short time may result in temporary blocking.",
useCases:["Automating configuration changes","Building custom dashboards","CI/CD integration"]}
]}
];}

/* ---- Free Limits Table (multi-lang) ---- */
function getFreeLimits(){
  var L=currentLang;
  if(L==="ja") return[
    {s:"Workers",l:"10万リクエスト / 日、CPU 10ms / リクエスト（超過分は有料）"},
    {s:"Pages",l:"10ビルド / 月、10GB帯域幅 / 月、10GBストレージ（超過分は有料）"},
    {s:"R2",l:"10GB保存、100万操作 / 月、100GBデータ転送（超過分は有料。ダウンロード料金はゼロ）"},
    {s:"KV",l:"10万読取 / 日、1,000書込 / 日、1GBストレージ（超過分は有料）"},
    {s:"Queues",l:"10,000キュー、10,000操作 / 日（超過分は有料）"},
    {s:"DNS",l:"10万レコード、500万クエリ / 日"},
    {s:"Browser Rendering",l:"10分 / 日、3並行ブラウザ（超過分は有料）"},
    {s:"Tunnel",l:"数・帯域幅ともに無制限"},
    {s:"DDoS防御",l:"無制限（攻撃の規模を問わず追加料金なし）"},
    {s:"SSL/TLS証明書",l:"全ドメインに無料で自動発行"},
    {s:"CDN帯域幅",l:"無制限"}
  ];
  return[
    {s:"Workers",l:"100K requests/day, 10ms CPU/request (paid beyond this)"},
    {s:"Pages",l:"10 builds/month, 10GB bandwidth/month, 10GB storage (paid beyond this)"},
    {s:"R2",l:"10GB storage, 1M ops/month, 100GB transfer (paid beyond this; downloads are free)"},
    {s:"KV",l:"100K reads/day, 1K writes/day, 1GB storage (paid beyond this)"},
    {s:"Queues",l:"10K queues, 10K ops/day (paid beyond this)"},
    {s:"DNS",l:"100K records, 5M queries/day"},
    {s:"Browser Rendering",l:"10 min/day, 3 concurrent browsers (paid beyond this)"},
    {s:"Tunnel",l:"Unlimited (tunnels and bandwidth)"},
    {s:"DDoS Protection",l:"Unlimited (no extra charge regardless of attack size)"},
    {s:"SSL/TLS Certificates",l:"Free automatic issuance for all domains"},
    {s:"CDN Bandwidth",l:"Unlimited"}
  ];
}

/* ---- Use Cases (multi-lang) ---- */
function getUseCases(){
  var L=currentLang;
  if(L==="ja") return[
    {t:"個人ブログ・ポートフォリオ",icon:"📝",c:"g",svcs:["Pages","CDN","SSL","DDoS防御","DNS","Analytics"],d:"Pagesでサイトを公開し、CDNで高速配信。SSLや攻撃防御も自動で有効。"},
    {t:"スタートアップのWebアプリ",icon:"🚀",c:"b",svcs:["Pages","Workers","KV","R2","Queues","WAF","Secrets"],d:"フロントエンドはPages、バックエンドはWorkersで構築。KVで設定管理、R2でファイル保存。"},
    {t:"小規模なオンラインショップ",icon:"🛒",c:"o",svcs:["CDN","DDoS防御","WAF","SSL","Bot対策","Analytics"],d:"セキュリティ全般をCloudflareに任せて、安心して商品を販売。"},
    {t:"IoT（モノのインターネット）プロジェクト",icon:"📟",c:"p",svcs:["Spectrum","Tunnel","R2","Workers","Queues"],d:"Spectrumで専用プロトコルを保護。Tunnelで安全に機器を接続。"},
    {t:"APIの開発",icon:"🔧",c:"a",svcs:["Workers","KV","R2","API Shield","Hyperdrive"],d:"Workersでサーバーなしにデプロイ。Hyperdriveでデータベースアクセスを高速化。"},
    {t:"自宅サーバーの公開",icon:"🏠",c:"r",svcs:["Tunnel","DDoS防御","SSL","DNS","WAF"],d:"Tunnelを使えばルーターの設定不要。IPアドレスも隠してセキュアに公開。"}
  ];
  return[
    {t:"Personal Blog & Portfolio",icon:"📝",c:"g",svcs:["Pages","CDN","SSL","DDoS","DNS","Analytics"],d:"Publish on Pages with automatic CDN acceleration, SSL, and attack protection."},
    {t:"Startup Web App",icon:"🚀",c:"b",svcs:["Pages","Workers","KV","R2","Queues","WAF","Secrets"],d:"Frontend on Pages, backend on Workers. KV for settings, R2 for file storage."},
    {t:"Small Online Store",icon:"🛒",c:"o",svcs:["CDN","DDoS","WAF","SSL","Bot Protection","Analytics"],d:"Let Cloudflare handle security so you can focus on selling."},
    {t:"IoT Project",icon:"📟",c:"p",svcs:["Spectrum","Tunnel","R2","Workers","Queues"],d:"Spectrum protects non-HTTP protocols. Tunnel securely connects devices."},
    {t:"API Development",icon:"🔧",c:"a",svcs:["Workers","KV","R2","API Shield","Hyperdrive"],d:"Deploy serverlessly with Workers. Speed up database access with Hyperdrive."},
    {t:"Home Server",icon:"🏠",c:"r",svcs:["Tunnel","DDoS","SSL","DNS","WAF"],d:"Tunnel removes the need for port forwarding. Your IP stays hidden."}
  ];
}

function getPhilosophy(){
  if(currentLang==="ja") return[
    {i:"🏢",t:"企業レベルのセキュリティを誰でも無料で"},
    {i:"💸",t:"帯域幅無制限で予想外の課金を防止"},
    {i:"🔧",t:"開発者がグローバルに活躍できる基盤"},
    {i:"🏪",t:"小規模ビジネスをサイバー脅威から守る"},
    {i:"🚪",t:"寛大な無料枠で始めやすく"},
    {i:"📈",t:"成長に合わせてスケールアップ可能"}
  ];
  return[
    {i:"🏢",t:"Enterprise-grade security for everyone"},
    {i:"💸",t:"Unlimited bandwidth to prevent surprise bills"},
    {i:"🔧",t:"A global platform for developers"},
    {i:"🏪",t:"Protect small businesses from cyber threats"},
    {i:"🚪",t:"Generous free tier to get started easily"},
    {i:"📈",t:"Scale up as you grow"}
  ];
}

/* ---- Intuitive page items ---- */
function getIntuitiveItems(){
  if(currentLang==="ja") return[
    {icon:"🏎️",t:"サイトの表示を速くする",d:"世界中のサーバーから、訪問者に一番近い場所でページを配信します。",svc:"cdn",c:"g"},
    {icon:"🛡️",t:"サイバー攻撃を自動で防ぐ",d:"大量アクセスによるサイトダウン攻撃（DDoS）を、設定なしで自動的にブロックします。",svc:"ddos",c:"o"},
    {icon:"🔒",t:"通信を暗号化する（HTTPS）",d:"ブラウザの「鍵マーク🔒」を無料で取得。訪問者との通信を暗号化して安全に。",svc:"ssl",c:"b"},
    {icon:"🌐",t:"Webサイトを無料で公開する",d:"GitHubにコードを送信するだけでサイトが自動公開。サーバーの用意は不要です。",svc:"pages",c:"p"},
    {icon:"⚡",t:"サーバーなしでプログラムを動かす",d:"自分でサーバーを持たなくても、世界中のCloudflareサーバーでプログラムを実行。1日10万回まで無料です。",svc:"workers",c:"a"},
    {icon:"🗄️",t:"ファイルを保存する",d:"画像や動画をクラウドに保存。データの取り出し（ダウンロード）に料金がかからないのが特徴です。（保存容量10GBまで無料、超過分は有料）",svc:"r2",c:"r"},
    {icon:"🚇",t:"自宅サーバーを安全に公開する",d:"ルーターの面倒な設定なしで、自宅のパソコンをインターネットに安全に公開できます。",svc:"tunnel",c:"t"},
    {icon:"🤖",t:"悪質なBotをブロックする",d:"スパムや不正アクセスを行う自動プログラム（Bot）をワンクリックで排除します。",svc:"botfight",c:"o"},
    {icon:"📊",t:"アクセス状況を分析する",d:"サイトへのアクセス数、攻撃の有無、表示速度などをリアルタイムで確認できます。",svc:"analytics",c:"b"},
    {icon:"📡",t:"ドメインを管理する（DNS）",d:"ドメイン名（example.com）とサーバーの結びつけを管理。非常に高速な応答速度です。",svc:"dns-service",c:"g"},
    {icon:"📬",t:"重い処理を順番待ちにする",d:"メール送信や画像加工など時間がかかる処理をキュー（順番待ち）に入れて確実に処理します。",svc:"queues",c:"p"},
    {icon:"🖼️",t:"画像を自動で最適化する",d:"画像のリサイズや圧縮を自動的に行い、ページの読み込み速度を改善します。（画像保存自体は有料。R2保存画像の変換は無料枠内で利用可能）",svc:"images",c:"a"}
  ];
  return[
    {icon:"🏎️",t:"Make your site faster",d:"Serve pages from the server closest to each visitor, anywhere in the world.",svc:"cdn",c:"g"},
    {icon:"🛡️",t:"Block cyber attacks automatically",d:"DDoS attacks (flooding your site with traffic) are blocked automatically, no setup needed.",svc:"ddos",c:"o"},
    {icon:"🔒",t:"Encrypt communication (HTTPS)",d:"Get the browser lock icon 🔒 for free. Encrypt all traffic between you and your visitors.",svc:"ssl",c:"b"},
    {icon:"🌐",t:"Publish a website for free",d:"Send code to GitHub and your site is automatically published. No server needed.",svc:"pages",c:"p"},
    {icon:"⚡",t:"Run code without a server",d:"Execute programs on Cloudflare's worldwide servers. Up to 100,000 requests/day free.",svc:"workers",c:"a"},
    {icon:"🗄️",t:"Store files in the cloud",d:"Store images and videos online. No download fees. (10GB storage free; overage is paid.)",svc:"r2",c:"r"},
    {icon:"🚇",t:"Safely share a home server",d:"Expose your local computer to the internet safely — no router configuration needed.",svc:"tunnel",c:"t"},
    {icon:"🤖",t:"Block malicious bots",d:"Stop spam and scraping bots with one click.",svc:"botfight",c:"o"},
    {icon:"📊",t:"Analyze your traffic",d:"See real-time data on visitors, attacks, and page speed.",svc:"analytics",c:"b"},
    {icon:"📡",t:"Manage your domain (DNS)",d:"Connect your domain name to your server. Extremely fast response times.",svc:"dns-service",c:"g"},
    {icon:"📬",t:"Queue heavy tasks",d:"Put time-consuming jobs like email sending into a queue for reliable processing.",svc:"queues",c:"p"},
    {icon:"🖼️",t:"Optimize images automatically",d:"Auto-resize and compress images for faster page loads. (Image storage is paid; R2-stored image transforms are free.)",svc:"images",c:"a"}
  ];
}

/* ==============================================================
   VIEW — Rendering Engine
   ============================================================== */

function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML;}

function chips(arr,c){return arr.map(function(a){return'<span class="ch '+(c||"")+'">'+ esc(a)+'</span>';}).join("");}

function secH(ico,t,sub){return'<div class="sec-h"><span class="ico">'+ico+'</span><h2>'+esc(t)+'</h2>'+(sub?'<p>'+esc(sub)+'</p>':'')+'</div>';}

function backBtn(to,label){var ui=u();return'<a href="'+(to||"#/")+'" class="btn-back">'+(label||ui.detailPg.back)+'</a>';}

function findSvc(id){var cats=getData();for(var i=0;i<cats.length;i++){for(var j=0;j<cats[i].services.length;j++){if(cats[i].services[j].id===id)return{s:cats[i].services[j],c:cats[i]};}}return null;}

function renderHome(){
  var ui=u(),h=ui.home;
  var hero='<section class="hero"><div class="narrow"><div class="hero-ico">☁️</div><h1><span class="hl">'+h.h1_1+'</span>'+esc(h.h1_2)+'<br>'+esc(h.h1_3)+'</h1><p class="desc">'+h.desc+'</p><div class="hero-btns"><a href="#/intuitive" class="btn btn-p">'+esc(h.btn1)+'</a><a href="#/services" class="btn btn-o">'+esc(h.btn2)+'</a></div></div></section>';
  var why=h.why.map(function(w){return'<div class="card"><div class="c-ico '+w.c+'">'+w.icon+'</div><h3>'+esc(w.t)+'</h3><p>'+esc(w.d)+'</p></div>';}).join("");
  var cats=getData().map(function(cat){var sc=cat.services.map(function(s){return'<span class="ch '+cat.chipColor+'">'+esc(s.name)+'</span>';}).join("");return'<a href="#/category/'+cat.id+'" class="card cl" style="text-decoration:none"><div style="display:flex;align-items:center;gap:11px;margin-bottom:10px"><div class="c-ico '+cat.chipColor+'">'+cat.icon+'</div><div><h3>'+esc(cat.title)+'</h3><p style="font-size:.78rem;color:var(--tx3)">'+esc(cat.subtitle)+'</p></div></div><div style="display:flex;flex-wrap:wrap;gap:3px">'+sc+'</div></a>';}).join("");
  var ql=ui.qlLinks.map(function(q){return'<a href="'+q.href+'" class="card cl" style="text-decoration:none;padding:16px 18px"><div class="qi">'+q.icon+'</div><h4>'+esc(q.t)+'</h4><p style="font-size:.76rem;color:var(--tx3)">'+esc(q.d)+'</p></a>';}).join("");
  return hero+'<section class="sec"><div class="container">'+secH("🌟",h.whyTitle,h.whySub)+'<div class="grid g3">'+why+'</div></div></section><section class="sec"><div class="container">'+secH("📂",h.catTitle,h.catSub)+'<div class="grid g2">'+cats+'</div><div class="ql">'+ql+'</div></div></section>';
}

function renderServices(){
  var ui=u(),cats=getData();
  var html='<div class="container page" style="padding:36px 20px 72px">'+backBtn("#/")+secH("📦",ui.servicesPg.title,ui.servicesPg.sub);
  cats.forEach(function(cat){
    html+='<div style="margin-bottom:40px"><a href="#/category/'+cat.id+'" class="cat-h" style="text-decoration:none"><div class="cat-ico '+cat.chipColor+'" style="background:var(--bg-sub)">'+cat.icon+'</div><div><h3>'+esc(cat.title)+'</h3><p>'+esc(cat.subtitle)+'</p></div></a><div class="grid g2">';
    cat.services.forEach(function(svc){
      html+='<a href="#/service/'+svc.id+'" class="card cl" style="text-decoration:none;padding:18px"><div style="display:flex;align-items:center;gap:9px;margin-bottom:6px"><span style="font-size:1.2rem">'+svc.icon+'</span><h3>'+esc(svc.name)+'</h3></div><p>'+esc(svc.shortDesc)+'</p></a>';
    });
    html+='</div></div>';
  });
  return html+'</div>';
}

function renderIntuitive(){
  var ui=u(),items=getIntuitiveItems();
  var html='<div class="narrow page" style="padding:36px 20px 72px">'+backBtn("#/")+secH("✨",ui.intPg.title,ui.intPg.sub)+'<div style="display:grid;gap:14px">';
  items.forEach(function(it){
    html+='<a href="#/service/'+it.svc+'" class="card cl int-card" style="text-decoration:none;padding:20px 22px"><div class="int-ico '+it.c+'">'+it.icon+'</div><div><h3>'+esc(it.t)+'</h3><p>'+esc(it.d)+'</p></div></a>';
  });
  return html+'</div></div>';
}

function renderLimits(){
  var ui=u(),data=getFreeLimits();
  var rows=data.map(function(r){return'<tr><td class="sn">'+esc(r.s)+'</td><td>'+esc(r.l)+'</td></tr>';}).join("");
  return'<div class="narrow page" style="padding:36px 20px 72px">'+backBtn("#/")+secH("📋",ui.limitsPg.title,ui.limitsPg.sub)+'<div class="tw"><table><thead><tr><th>'+esc(ui.limitsPg.thSvc)+'</th><th>'+esc(ui.limitsPg.thLimit)+'</th></tr></thead><tbody>'+rows+'</tbody></table></div><p style="margin-top:14px;font-size:.8rem;color:var(--tx3);text-align:center">'+esc(ui.limitsPg.note)+'</p></div>';
}

function renderUseCases(){
  var ui=u(),ucs=getUseCases(),ph=getPhilosophy();
  var cards=ucs.map(function(uc){return'<div class="card"><div class="c-ico '+uc.c+'">'+uc.icon+'</div><h3>'+esc(uc.t)+'</h3><p>'+esc(uc.d)+'</p><div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:10px">'+chips(uc.svcs,uc.c)+'</div></div>';}).join("");
  var phHtml=ph.map(function(p){return'<div class="card phi"><span class="pi">'+p.i+'</span><span class="pt">'+esc(p.t)+'</span></div>';}).join("");
  return'<div class="container page" style="padding:36px 20px 72px">'+backBtn("#/")+secH("💡",ui.ucPg.title,ui.ucPg.sub)+'<div class="grid g2">'+cards+'</div><div style="margin-top:40px">'+secH("🎯",ui.ucPg.phTitle,"")+'<div class="grid g3">'+phHtml+'</div></div></div>';
}

function renderServiceDetail(id){
  var ui=u(),r=findSvc(id);
  if(!r)return'<div class="narrow page" style="padding:72px 20px;text-align:center"><p>'+esc(ui.detailPg.notFound)+'</p>'+backBtn("#/")+'</div>';
  var svc=r.s,cat=r.c;
  var feats=svc.freeFeatures.map(function(f){return'<li>'+esc(f)+'</li>';}).join("");
  var detail=svc.detail.split("\n").map(function(p){return p.trim()?'<p style="margin-bottom:10px">'+esc(p)+'</p>':'';}).join("");
  var ucs=svc.useCases?'<div class="ds card"><h3>'+ui.detailPg.usecases+'</h3><div style="display:flex;flex-wrap:wrap;gap:5px">'+chips(svc.useCases,cat.chipColor)+'</div></div>':'';
  var related=cat.services.filter(function(s){return s.id!==svc.id;});
  var relHtml=related.length?'<div class="rel"><h4>'+ui.detailPg.related+'</h4><div class="rel-list">'+related.map(function(s){return'<a href="#/service/'+s.id+'" class="rel-item"><span style="font-size:1.05rem">'+s.icon+'</span>'+esc(s.name)+'</a>';}).join("")+'</div></div>':'';
  return'<div class="narrow page" style="padding:36px 20px 72px">'+backBtn("#/category/"+cat.id)+'<div class="dh"><div class="di '+cat.chipColor+'" style="background:var(--bg-sub)">'+svc.icon+'</div><h1>'+esc(svc.name)+'</h1><p class="dd">'+esc(svc.shortDesc)+'</p><span class="ch '+cat.chipColor+'">'+esc(cat.title)+'</span></div><div class="ds card"><h3>'+ui.detailPg.explain+'</h3><div class="db">'+detail+'</div></div><div class="ds card"><h3>'+ui.detailPg.freeFeats+'</h3><ul class="cl-list">'+feats+'</ul></div>'+ucs+relHtml+'</div>';
}

function renderCategoryDetail(id){
  var ui=u(),cats=getData(),cat=null;
  for(var i=0;i<cats.length;i++){if(cats[i].id===id){cat=cats[i];break;}}
  if(!cat)return'<div class="narrow page" style="padding:72px 20px;text-align:center"><p>'+esc(ui.detailPg.notFound)+'</p>'+backBtn("#/")+'</div>';
  var svcs=cat.services.map(function(svc){
    var preview=svc.freeFeatures.slice(0,4).map(function(f){return'<span class="ch '+cat.chipColor+'">'+esc(f)+'</span>';}).join("");
    var more=svc.freeFeatures.length>4?'<span class="ch">+'+(svc.freeFeatures.length-4)+'</span>':'';
    var desc=svc.detail.split("\n")[0];
    return'<a href="#/service/'+svc.id+'" class="card cl" style="text-decoration:none"><div style="display:flex;align-items:center;gap:11px;margin-bottom:9px"><div class="c-ico '+cat.chipColor+'">'+svc.icon+'</div><div><h3>'+esc(svc.name)+'</h3><p style="font-size:.78rem;color:var(--tx3)">'+esc(svc.shortDesc)+'</p></div></div><p style="margin-bottom:10px">'+esc(desc)+'</p><div style="display:flex;flex-wrap:wrap;gap:3px">'+preview+more+'</div></a>';
  }).join("");
  return'<div class="container page" style="max-width:880px;margin:0 auto;padding:36px 20px 72px">'+backBtn("#/services",ui.detailPg.back)+'<div class="dh"><div class="di '+cat.chipColor+'" style="background:var(--bg-sub)">'+cat.icon+'</div><h1>'+esc(cat.title)+'</h1><p class="dd">'+esc(cat.subtitle)+'</p></div><div style="display:grid;gap:16px">'+svcs+'</div></div>';
}

function renderAbout(){
  var ui=u(),a=ui.aboutPg;
  var links=[
    {l:"Cloudflare Official",u:"https://www.cloudflare.com/"},
    {l:"Dashboard",u:"https://dash.cloudflare.com/"},
    {l:"Developers Docs",u:"https://developers.cloudflare.com/"},
    {l:"Blog",u:"https://blog.cloudflare.com/"},
    {l:"Community",u:"https://community.cloudflare.com/"}
  ].map(function(lk){return'<a href="'+lk.u+'" target="_blank" rel="noopener noreferrer">🔗 '+esc(lk.l)+'</a>';}).join("");
  return'<div class="narrow page" style="padding:36px 20px 72px">'+backBtn("#/")+secH("ℹ️",a.title,a.sub)+'<div class="card" style="margin-bottom:18px"><h3 style="margin-bottom:10px">'+a.warnTitle+'</h3><div class="notice">'+a.warnText+'</div></div><div class="card" style="margin-bottom:18px"><h3 style="margin-bottom:10px">'+a.purposeTitle+'</h3><p>'+esc(a.purposeText)+'</p></div><div class="card" style="margin-bottom:18px"><h3 style="margin-bottom:10px">'+a.linksTitle+'</h3><div class="lnk">'+links+'</div></div><div class="card"><h3 style="margin-bottom:10px">'+a.techTitle+'</h3><p style="color:var(--tx2)">'+esc(a.techText)+'</p></div></div>';
}

function renderFooter(){
  var ui=u();
  var links=[["#/",{ja:"ホーム",en:"Home"}],["#/services",ui.nav.services],["#/intuitive",ui.nav.intuitive],["#/limits",ui.nav.limits],["#/usecases",ui.nav.usecases],["#/about",ui.nav.about]];
  var fl=links.map(function(l){var label=typeof l[1]==="object"?(l[1][currentLang]||l[1].en):l[1];return'<a href="'+l[0]+'">'+label+'</a>';}).join("");
  return'<footer class="ft"><div class="ft-logo">☁️</div><div class="ft-title">'+esc(ui.siteTitle)+'</div><div class="ft-links">'+fl+'</div><div class="ft-notice">'+ui.footer.notice+'</div><div class="ft-copy">&copy; 2026 '+esc(ui.siteTitle)+'</div></footer>';
}

/* ==============================================================
   CONTROLLER — Router & Init
   ============================================================== */

function getRoute(){
  var h=window.location.hash.replace("#","") || "/";
  return h.split("/").filter(Boolean);
}

function updateNav(){
  var ui=u();
  document.getElementById("header-title").textContent=ui.siteTitle;
  var nav=document.getElementById("site-nav");
  nav.innerHTML=[
    ["#/services",ui.nav.services],
    ["#/intuitive",ui.nav.intuitive],
    ["#/limits",ui.nav.limits],
    ["#/usecases",ui.nav.usecases],
    ["#/about",ui.nav.about]
  ].map(function(n){return'<a href="'+n[0]+'">'+n[1]+'</a>';}).join("");

  // Lang switcher
  var sw=document.getElementById("lang-switcher");
  var cur=UI[currentLang];
  sw.innerHTML='<button class="lang-btn" id="lang-btn">'+cur.flag+' '+cur.name+'</button><div class="lang-dropdown" id="lang-dd">'+SUPPORTED.map(function(code){var l=UI[code];return'<button class="lang-option'+(code===currentLang?' active':'')+'" data-lang="'+code+'">'+l.flag+' '+l.name+'</button>';}).join("")+'</div>';
}

function renderApp(){
  var parts=getRoute();
  var page=(parts[0]||"").toLowerCase();
  var content="";
  switch(page){
    case "services":content=renderServices();break;
    case "intuitive":content=renderIntuitive();break;
    case "limits":content=renderLimits();break;
    case "usecases":content=renderUseCases();break;
    case "service":content=renderServiceDetail(parts[1]||"");break;
    case "category":content=renderCategoryDetail(parts[1]||"");break;
    case "about":content=renderAbout();break;
    default:content=renderHome();break;
  }
  document.getElementById("app").innerHTML=content+renderFooter();
  window.scrollTo({top:0,behavior:"smooth"});
}

window.addEventListener("hashchange",renderApp);
window.addEventListener("DOMContentLoaded",function(){
  currentLang=detectLang();
  updateNav();
  renderApp();

  window.addEventListener("scroll",function(){
    var h=document.querySelector(".site-header");
    if(h)h.classList.toggle("scrolled",window.scrollY>20);
  });

  document.addEventListener("click",function(e){
    // Mobile nav toggle
    if(e.target.classList.contains("nav-toggle")||e.target.closest(".nav-toggle")){
      var nav=document.getElementById("site-nav");
      if(nav)nav.classList.toggle("open");
    }
    // Close mobile nav on link click
    if(e.target.closest(".site-nav a")){
      var nav2=document.getElementById("site-nav");
      if(nav2)nav2.classList.remove("open");
    }
    // Lang button
    if(e.target.id==="lang-btn"||e.target.closest("#lang-btn")){
      var dd=document.getElementById("lang-dd");
      if(dd)dd.classList.toggle("open");
      e.stopPropagation();
      return;
    }
    // Lang option
    if(e.target.classList.contains("lang-option")){
      var code=e.target.getAttribute("data-lang");
      if(code)setLang(code);
      var dd2=document.getElementById("lang-dd");
      if(dd2)dd2.classList.remove("open");
      return;
    }
    // Close dropdown
    var dd3=document.getElementById("lang-dd");
    if(dd3)dd3.classList.remove("open");
  });
});
