// ==UserScript==
// @name         一括チェック
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        https://item.rms.rakuten.co.jp/rms-item-download/shops/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rakuten.co.jp
// @grant       GM_log
// @updateURL    https://github.com/hepokon365/updatable_userscript/raw/master/src/sample.user.js
// @downloadURL  https://github.com/hepokon365/updatable_userscript/raw/master/src/sample.user.js
// @supportURL   https://github.com/hepokon365/updatable_userscript
// @run-at document-idle
// ==/UserScript==

//(function() {

'use strict';

async function waitQuerySelector(selector, node=document){
    let obj=null;
    while(!obj){
        obj=await new Promise(resolve=>setTimeout(()=>resolve(node.querySelector(selector), 100)));
    }
    return obj;
}

let container =await  waitQuerySelector(".rms-row.justify-content-center.pa-16");


(function() {
    document.body.insertAdjacentHTML('beforebegin',
                                     `<style>
                                     .exatend_btn {
                                        margin-right:12px;
                                        border:none;
                                        background:#dcdcdc;
                                        line-height: 2rem;
                                        border-radius: 4px;}
                                      </style>`)

    container
        .insertAdjacentHTML('beforebegin',
                            `<button id="itemAll" class="exatend_btn">全項目一括チェック</button>
<button id="itemNameChange" class="exatend_btn">商品名変更セットをチェック</button>
<button id="itemPrice" class="exatend_btn">金額変更セットをチェック</button>
<button id="allClear" class="exatend_btn">全てクリア</button>
`)


    let itemAll = document.getElementById('itemAll');
    let itemNameChange = document.getElementById('itemNameChange');
    let itemPrice= document.getElementById('itemPrice');
    let allClear =  document.getElementById('allClear');


    allClear.addEventListener('click', function(){
        let buttons = document.getElementsByName("buttons")[1]
        let clear = document.querySelectorAll(".rms-btn.btn-link")
        if( buttons.checked) {
            clear[0].click();
        } else {
            clear[3].click();
        }
        event.stopPropagation();
    })

    itemNameChange.addEventListener('click', function(){
        var list = [16,57]
        clickNodelist(list)
        event.stopPropagation();
    });


    itemAll.addEventListener('click', function(){
        var list = [15,18,23,29,35,44,47,55,61,68,73,82,89,92,95,101]
        clickNodelist(list)
    });

    itemPrice.addEventListener('click', function(){
        var list = [30,31]
        clickNodelist(list)
        event.stopPropagation();
    });


    function clickNodelist(list){
        let label =  document.querySelectorAll("label.rms-check-label");

        let offset = 0
        let buttons = document.getElementsByName("buttons")[1]
        let clear = document.querySelectorAll(".rms-btn.btn-link")

        if( buttons.checked) {
            offset = 11
            clear[0].click();
        } else {
            clear[3].click();
        }

        for (var i in list ){
            let nodelist = list[i]
            let n = nodelist - offset
            label[n].click()
        }
        event.stopPropagation();
    }

})();
