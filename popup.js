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

function getEventInfo(userId, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.github.com/users/${userId}/events/public`, true);
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      response.forEach(event => {
        if(event.payload && event.payload.commits) {
          event.payload.commits.forEach(commit => {
            if(commit.author && commit.author.email) {
              const email = commit.author.email;
              if(email) {
                callback(email);
                return;
              }
            }
          });
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, tabs => {
    const tabUrl = tabs[0].url;
    const githubId = tabUrl.split('/')[3];

    getEventInfo(githubId, email => {
      var div = document.getElementById('email');
      div.innerHTML += `Email: ${email}`;
    });
  });
});
