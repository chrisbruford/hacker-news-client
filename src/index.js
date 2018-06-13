import { HN } from './hackernews/hn.api';
import { DateHelper } from './date-helper/date-helper';

let HNService = new HN();
let dateHelper = new DateHelper();
let hnItems = new Map();

//initial load to pull in just top10 news items
//and lazy-load top-level comments
 (async function loadTopNews() {
    HNService.getTopNews()
        .then(async newsIDs => {
            newsIDs = newsIDs.slice(0, 10);

            let listGroup = document.querySelector('.list-group');
            for (let id of newsIDs) {
                await HNService.getItem(id)
                    .then(async newsItem => {
                        hnItems.set(newsItem.id, newsItem);
                        newsItem.kids = newsItem.kids || [];
                        let timeAgo = dateHelper.timeAgo(newsItem.time * 1000);

                        let listItem = document.createElement('a');
                        listItem.href = newsItem.url
                        listItem.className = `list-group-item list-group-item-action flex-column align-items-start`;
                        listItem.id = `newsitem-${newsItem.id}`;

                        listItem.innerHTML = `<div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">${newsItem.title}</h5>
                                                    <small>${timeAgo}</small>
                                                </div>
                                                <small>${newsItem.score} points by ${newsItem.by}</small>
                                                <p><a id="load-comments" href="#comments-${newsItem.id}" data-toggle="collapse" aria-expanded="false" aria-controls="comments-${newsItem.id}"><small>${newsItem.kids.length} comments</small></a></p>

                                                <div class="collapse" id="comments-${newsItem.id}" data-parent="#newsitem-${newsItem.id}" >
                                                <div class="list-group comments">
                                                    
                                                </div>
                                                </div>
                                                `;

                        let target = listItem.querySelector('.comments');
                        listItem.querySelector('#load-comments').addEventListener('click', function () {
                            loadComments(newsItem.id, target);
                        })

                        listGroup.appendChild(listItem);
                    });
            }
        })
        .catch(console.error);
})();

//load comments with link to recursively load sub-comments
async function loadComments(id, target) {
    //only load into empty containers (cheap way to stop re-loading unnecesserily)
    if (target.children && target.children.length > 0) {return}

    let item = hnItems.get(id);
    let ids = item ? item.kids || [] : [];

    for (let id of ids) {
        await HNService.getItem(id)
            .then(comment => {
                hnItems.set(comment.id,comment);
                comment.kids = comment.kids || [];
                let timeAgo = dateHelper.timeAgo(comment.time * 1000);

                let div = document.createElement('div');
                div.className = `list-group-item list-group-item-action flex-column align-items-start`;
                div.id = `comment-${comment.id}`;
                div.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${comment.by}</h5>
                        <small>${timeAgo}</small>
                    </div>
                    <p>${comment.text}</p>
                    <p><a id="load-comments-${comment.id}" href="#comments-${comment.id}" data-toggle="collapse" aria-expanded="false" aria-controls="comments-${comment.id}"><small>${comment.kids.length} comments</small></a></p>
                    <div class="collapse" id="comments-${comment.id}" data-parent="#comment-${comment.id}">
                        <div class="list-group comments">
                            
                        </div>
                    </div>
                    `;

                div.querySelector(`#load-comments-${comment.id}`).addEventListener('click', function () {
                    loadComments(comment.id, div.querySelector('.comments'));
                });
                target.appendChild(div);
            });
    }
}