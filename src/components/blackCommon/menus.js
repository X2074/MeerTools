
export default [
    { text: 'leftNav.p35', path: '/messages', icon: 's18', id: "messages", messageTip: false },//站内信
    { text: 'leftNav.p9', path: '/my-creation', icon: 's9', id: "my-creation" },//我的作品
    {//因为这个模块下有展开，定位功能，为了能准确定位，将子级的id通通加在父级，这样可以使用indexof来判断展开，定位功能
        text: 'leftNav.p14', title: 'leftNav.p10', icon: 's12', zoom: false,
        children: [
            { text: 'leftNav.p19', title: 'leftNav.p10', path: '/dimai-collection', id: "dimai-collection" },//dimai合集
            { text: 'leftNav.p17', title: 'leftNav.p10', path: '/my-collection', id: "my-collection" },//原创合集
            { text: 'leftNav.p20', title: 'leftNav.p10', path: '/custom-collection', id: "custom-collection" },//非原创合集
            { text: 'leftNav.p32', title: 'leftNav.p10', path: '/activity-nft', id: "activity-nft" },//活动合集
        ]

    },
    { text: 'leftNav.p34', title: 'leftNav.p34', path: '/my-prompt', icon: 's17', id: "my-prompt" },//我的prompt

    {
        text: 'leftNav.p22', icon: 's16', id: "invitemy-invite", zoom: false,
        children: [
            { text: 'leftNav.p22', path: '/invite', id: "invite" },
            { text: 'leftNav.p2201', path: '/my-invite', id: "my-invite" }
        ]
    },//未来探险家
    {
        text: 'leftNav.p11', icon: 's11', id: "purchasepurchase-recorduse-record", zoom: false,
        children: [
            { text: 'leftNav.p11', title: 'leftNav.p10', path: '/purchase', id: "purchase" },
            { text: 'personal.purchase.title', path: '/purchase-record', id: "purchase-record" },
            { text: 'personal.records.title', path: '/use-record', id: "use-record" }
        ]
    },//购买dim
    { text: 'leftNav.p8', path: 'https://dimai.gitbook.io/docs/faq', icon: 's8', type: true }
]