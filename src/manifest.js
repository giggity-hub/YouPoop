const options = {
    "name": "YouPoop",
    "description": "Support Creators without buying shit",
    "version": "1.0",
    "manifest_version": 3,
    "content_scripts": [{
        "matches": ["https://www.youtube.com/*"],
        "js": ["content-script.js"],
        "css": ["css/fart-overlay.css"]
    }],
    "web_accessible_resources": [
        {
            "resources": ["/farts/*"],
            "matches": ["https://www.youtube.com/*"]
        }
    ],
    "action":{
        "default_popup": "popup/index.html"
    }
}

module.exports = options