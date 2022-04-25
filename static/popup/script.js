// alert('sheeeeeeeeeesh')



$assCountInput = document.querySelector('#ass-count-input');
console.log($assCountInput);

$assCountInput.addEventListener('change', async (e)=>{
    const {value} = e.target
    console.log(value);

    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currentTab = tabs[0]
    if (currentTab) {
        chrome.tabs.sendMessage(currentTab.id, {action: 'SET_ASS_COUNT', assCount: value})
    }
    // chrome.runtime.sendMessage({'assCount': value}, (response)=>{
    //     console.log(response);
    // });
})

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    if (currTab) { // Sanity check
      /* do stuff */
    }
  });