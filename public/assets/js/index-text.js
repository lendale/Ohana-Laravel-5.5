function initHeaderText() {
    var data = [{
            title: "A Link To The Past.",
            sub: "Subtitle"
        },
        {
            title: "A Key To Your Future.",
            sub: "Subtitle"
        },
        {
            title: "Social.",
            sub: "Subtitle"
        }
    ];

    $("#head_carousel_title_1").html(data[0].title);
    $("#head_carousel_sub_1").html(data[0].sub);
    $("#head_carousel_title_2").html(data[1].title);
    $("#head_carousel_sub_2").html(data[1].sub);
    $("#head_carousel_title_3").html(data[2].title);
    $("#head_carousel_sub_3").html(data[2].sub);
}

function initFeaturesText() {
    var data = [{
            "title": "What is O H A N A ?",
            "sub": "This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more."
        },
        {
            "title": "Family Tree Organizer",
            "sub": "We did most of the heavy lifting for you to provide a genealogy organizer that's not just interactive but also dynamic. Dynamic because it grows together with all the users' data."
        },
        {
            "title": "Event Notifications",
            "sub": "With the Ohana notification system, you will never be outdated with the happenings around your clan. Receive invitations and announcements straight to your account in real-time."
        },
        {
            "title": "Clan Album",
            "sub": "They say, \"a picture paints a thousand words.\" We care about your moments. With the clan album, you will be sure that your precious memories will forever be cherished and shared to everyone in your clan."
        }
    ];

    $("#ohana_title").html(data[0].title);
    $("#ohana_desc").html(data[0].sub);
    $("#feat_title_1").html(data[1].title);
    $("#feat_sub_1-1").html(data[1].sub);
    $("#feat_title_2").html(data[2].title);
    $("#feat_sub_2").html(data[2].sub);
    $("#feat_title_3").html(data[3].title);
    $("#feat_sub_3").html(data[3].sub);

    $("#feat_sub_1").html(data[1].sub);
    $("#feat_title_1-1").html(data[1].title);
    $("#feat_title_2-1").html(data[2].title);
    $("#feat_sub_2-1").html(data[2].sub);
    $("#feat_title_3-1").html(data[3].title);
    $("#feat_sub_3-1").html(data[3].sub);
}

function initTeamText() {
    var data = [{
            "title": "The Executive Team",
            "desc": "This is the paragraph where you can write more details about your team. Keep you user engaged by providing meaningful information.",
        },
        {
            "name": "Allen Dale Gabisan",
            "pic": "assets/img/index/allen.jpg",
            "pos": "Android Developer",
            "fb": "https://www.facebook.com/allendowg",
            "twitter": "https://www.twitter.com/allendowg",
            "gplus": "https://www.google.com/+AllenDaleGabisan19",
            "insta": "https://www.instagram.com/allendowg",
            "sub": "Don't be scared of the truth because we need to restart the human foundation in truth..."
        },
        {
            "name": "Jhon Paul Medalle",
            "pic": "assets/img/index/chuck.jpg",
            "pos": "Web Developer",
            "fb": "https://www.facebook.com/chuck.jhonii",
            "twitter": "https://www.twitter.com/ChuckJhon",
            "gplus": "https://www.google.com/",
            "insta": "https://www.instagram.com/jhonpaulmedalle",
            "sub": "Don't be scared of the truth because we need to restart the human foundation in truth..."
        },
        {
            "name": "Rezanne Naomi Lao Cubelo",
            "pic": "assets/img/index/nami.jpg",
            "pos": "Web Developer",
            "fb": "https://www.facebook.com/RezanneLao",
            // "twitter": "",
            "gplus": "https://goo.gl/RezanneLao",
            "insta": "https://www.instagram.com/rnlc_san",
            "sub": "I love you like Kanye loves Kanye. Don't be scared of the truth."
        },
        {
            "name": "Niña Andrea Dakay",
            "pic": "assets/img/index/nina.jpg",
            "pos": "Web Developer",
            "fb": "https://www.facebook.com/andreadaksss",
            "twitter": "https://www.twitter.com/andreadaksss",
            "gplus": "https://goo.gl/a3kRrQ",
            "insta": "https://www.instagram.com/andreadaksss",
            "sub": "I love you like Kanye loves Kanye. Don't be scared of the truth because we need to restart the human foundation."
        },
    ];

    $("#team_title").html(data[0].title);
    $("#team_desc").html(data[0].desc);
    $("#team_mem_name_1").html(data[1].name);
    $("#team_mem_pos_1").html(data[1].pos);
    $("#team_mem_sub_1").html(data[1].sub);
    $("#team_mem_pic_1").attr("src", data[1].pic);
    $("#team_mem_fb_1").attr("href", data[1].fb);
    $("#team_mem_twit_1").attr("href", data[1].twitter);
    $("#team_mem_gplus_1").attr("href", data[1].gplus);
    $("#team_mem_insta_1").attr("href", data[1].insta);

    $("#team_mem_name_2").html(data[2].name);
    $("#team_mem_pos_2").html(data[2].pos);
    $("#team_mem_sub_2").html(data[2].sub);
    $("#team_mem_pic_2").attr("src", data[2].pic);
    $("#team_mem_twit_2").attr("href", data[2].twitter);
    $("#team_mem_gplus_2").attr("href", data[2].gplus);
    $("#team_mem_insta_2").attr("href", data[2].insta);

    $("#team_mem_name_3").html(data[3].name);
    $("#team_mem_pos_3").html(data[3].pos);
    $("#team_mem_sub_3").html(data[3].sub);
    $("#team_mem_pic_3").attr("src", data[3].pic);
    $("#team_mem_fb_3").attr("href", data[3].fb);
    $("#team_mem_twit_3").attr("href", data[3].twitter);
    $("#team_mem_gplus_3").attr("href", data[3].gplus);
    $("#team_mem_insta_3").attr("href", data[3].insta);

    $("#team_mem_name_4").html(data[4].name);
    $("#team_mem_pos_4").html(data[4].pos);
    $("#team_mem_sub_4").html(data[4].sub);
    $("#team_mem_pic_4").attr("src", data[4].pic);
    $("#team_mem_fb_4").attr("href", data[4].fb);
    $("#team_mem_twit_4").attr("href", data[4].twitter);
    $("#team_mem_gplus_4").attr("href", data[4].gplus);
    $("#team_mem_insta_4").attr("href", data[4].insta);
}

(function() {
    initHeaderText();
    initFeaturesText();
    initTeamText();
}())