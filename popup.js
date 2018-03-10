// #!/bin/bash
//
// handle=$1
// target="https://api.github.com/users/TEMP/events/public"
// target=${target//TEMP/$handle}
// echo "Target URL: $target"
// tmp=$(curl -A "Mozilla/5.0" -L -k -b /tmp/c -c /tmp/c -s $target | egrep -o "\b[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+\b" | sort | uniq)
// if [ "$tmp" = "" ]; then
//     echo "No Email Addresses Found"
// else
// 	echo "Email Addresses:"
// 	echo "$tmp"
// fi

document.addEventListener('DOMContentLoaded', () => {
  const queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, tabs => {
    const tabUrl = tabs[0].url;
    const githubId = tabUrl.split('/')[3];

    
  });
});
