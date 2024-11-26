
export default [
    {
        text: 'leftNav.p1t', path: '', children: [
            { text: 'leftNav.p1', path: '/create-image', icon: 's1', id: "create-image" },//绘画
            { text: 'leftNav.p16', path: '/image-to-image', icon: 's14', id: "image-to-image" },//图生图
            { text: 'leftNav.p12', path: '/next-ai', icon: 's2', id: "next-ai" },//下一个ai
        ]
    },
    {
        text: 'leftNav.p10', path: '', children: [
            { text: 'leftNav.p13', title: 'leftNav.p10', path: '/mint-nft', icon: 's20', id: "mint-nft" },//mint
            { text: 'leftNav.p37', title: 'leftNav.p37', path: '/mint-prompt', icon: 's23', id: "mint-prompt" },
            { text: 'leftNav.p18', title: 'leftNav.p10', path: '/create-collection', icon: 's22', id: "create-collection" }
        ]
    },
    {
        text: 'leftNav.p2t', path: '', children: [
            { text: 'leftNav.p30', id: "events", path: '/events', icon: 's16' },
            { text: 'leftNav.p15', path: '/nft-space', icon: 's13', id: "nft-space" },//nft展示
            { text: 'leftNav.p33', path: '/prompt-display', icon: 's19', id: "prompt-display" },//nft展示
            {
                text: 'leftNav.p7', icon: 's7', id: "artistic-spacedaily-theme", position: "first",
                children: [
                    { text: 'gallery.gallery', path: '/artistic-space', id: "artistic-space" },
                    { text: 'gallery.gallery01', path: '/daily-theme', id: "daily-theme" }
                ]
            },//创意空间
            //这里show:false 为了左侧菜单不显示名称，通过浏览器能访问的路由
        ]
    },
    {
        text: 'leftNav.p3t', path: 'personal-space', children: [
            { text: 'leftNav.p9', path: '/my-creation', icon: 's9', id: "my-creation" },//我的作品
            {//因为这个模块下有展开，定位功能，为了能准确定位，将子级的id通通加在父级，这样可以使用indexof来判断展开，定位功能
                text: 'leftNav.p14', title: 'leftNav.p10', icon: 's12', id: "dimai-collectionmy-collectioncustom-collectionactivity-nft", position: "activity-nft",
                children: [
                    { text: 'leftNav.p19', title: 'leftNav.p10', path: '/dimai-collection', id: "dimai-collection" },
                    { text: 'leftNav.p17', title: 'leftNav.p10', path: '/my-collection', id: "my-collection" },
                    { text: 'leftNav.p20', title: 'leftNav.p10', path: '/custom-collection', id: "custom-collection" },
                    { text: 'leftNav.p32', title: 'leftNav.p10', path: '/activity-nft', id: "activity-nft" }
                ]

            },//nft相关,
            { text: 'leftNav.p34', title: 'leftNav.p34', path: '/my-prompt', icon: 's17', id: "my-prompt" },//我的prompt
            { text: 'leftNav.p35', path: '/messages', icon: 's18', id: "messages", messageTip: false },//站内信
            {
                text: 'leftNav.p22', icon: 's16', id: "invitemy-invite", position: "my-invite",
                children: [
                    { text: 'leftNav.p22', path: '/invite', id: "invite" },
                    { text: 'leftNav.p2201', path: '/my-invite', id: "my-invite" }
                ]
            },//未来探险家
            {
                text: 'leftNav.p11', icon: 's11', id: "purchasepurchase-recorduse-record", position: "use-record",
                children: [
                    { text: 'leftNav.p11', title: 'leftNav.p10', path: '/purchase', id: "purchase" },
                    { text: 'personal.purchase.title', path: '/purchase-record', id: "purchase-record" },
                    { text: 'personal.records.title', path: '/use-record', id: "use-record" }
                ]
            },//购买dim

        ]
    },
]