var retailer_config = {
    "name" : "qa",
	"display_name" : "Narvar QA",
    "weburl" : "http://www.thelimited.com/",
	"branding" : {
		"brand-primary" :null,
		"brand-secondary" :null,
		"brand-call-to-action" :null,
		"brand-base" : null,
		"brand-success" : null,
		"brand-error" : null,
		"body-bg" : null,
		"panel-bg" : null,
		"border-color" : null,
		"text-color" : null,
		"link-color" : null,
		"link-hover-color" : null,
		"font-family-primary" : null,
		"font-family-secondary": null,
		"font-family-base":  null
	},

    "quirks" : {
      "ccare_weburl": "http://www.thelimited.com/contactus",
      "hasFooterLogo" : true,
      "flipViaHover" : false,
      "hasAboutPanel" : true,
      "flipAllCards" : true,
      "displayImage" : true,
      "hasWidgetEnabled" : false,
      "hasImageEnabled" : true,
      "footerLogo" : "logo-narvar-solid.png",
      "imageName" : "/public/images/retailers/thelimited/ads/new_arrivals.jpg",
      "imageClickUrl" : "http://www.thelimited.com/on/demandware.store/Sites-ltd-Site/default/Default-Start?cid=EMC-MAIL-0005690&utm_source=narvar&utm_medium=email&utm_campaign=ship_tracking_email_150609",
      "mobileLayout" : "custom",
      "desktopLayout" : "custom",
      "isFixedThirdPanel" : true,
      "isCustomHeader" : true
    },


  


    "features" : {
      "sms": {
	  "enabled": false,
	  "opt_in": false,
      "phone": "+16464900198"
    },
	  "returns" : {
		  "enable_from_returns_center":true,
		  "enable_from_tracking":true,
			"enable": true,
			"enable_mail": true,
			"enable_store": true,
			"enable_courier": false
    },
	  "marketing_ads" : {
		  "enable_desktop" : true,
		  "enable_mobile" : true,
		  "enable_returns" : true,
		  "ads" : [{
				  "sort_order": 1,
				  "data_advid": "ad-click",
				  "alt_text":"Marketing Ad",
				  "target_url": "http://www.narvar.com",
				  "desktop_src_2x": "http://placehold.it/290x300?text=2X", 
				  "desktop_src": "http://placehold.it/290x300", 
				  "mobile_src_2x": "http://placehold.it/300x300",
				  "mobile_src": "http://placehold.it/200x200"
				  },
				  {
				  "sort_order": 2,
				  "data_advid": "ad-click",
				  "alt_text":"Marketing Ad",
				  "target_url": "http://www.narvar.com",
				  "desktop_src_2x": "http://placehold.it/290x300?text=2X", 
				  "desktop_src": "http://placehold.it/290x300", 
				  "mobile_src_2x": "http://placehold.it/300x300",
				  "mobile_src": "http://placehold.it/200x200"
				  },
				  {
				  "sort_order": 3,
				  "data_advid": "ad-click",
				  "alt_text":"Marketing Ad",
				  "target_url": "http://www.narvar.com",
				  "desktop_src_2x": "http://placehold.it/290x300?text=2X", 
				  "desktop_src": "http://placehold.it/290x300", 
				  "mobile_src_2x": "http://placehold.it/300x300",
				  "mobile_src": "http://placehold.it/200x200"
				  },
				  {
				  "sort_order": 4,
				  "data_advid": "ad-click",
				  "alt_text":"Marketing Ad",
				  "target_url": "http://www.narvar.com",
				  "desktop_src_2x": "http://placehold.it/290x300?text=2X",
				  "desktop_src": "http://placehold.it/290x300", 
				  "mobile_src_2x": "http://placehold.it/300x300",
				  "mobile_src": "http://placehold.it/200x200"
				  }
				  ]
		},
	  "instagram" : {
    "enable": false,
    "user_id": "3907894",
    "search_param":"@neimanmarcus"
  	}
    },
	"layout": {
		"template": "page-builder",
	},



    "contact" : {
      "email" : "",
      "phone" : "1-877-583-1963",
      "faq_url" : "http://www.thelimited.com/customer-service/returns/returns-exchanges.html",
      "chat" : {
        "service": "",
        "key": "",
        "id": ""
      },
      "contact_type":["phone","faq"],
      "mobile_contact_type":["phone","faq"]
    },
	

};