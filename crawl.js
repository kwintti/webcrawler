const { JSDOM } = require('jsdom')


function getURLsFromHTML(htmlb, baseURL){
    const obj = new JSDOM(htmlb)
    const items = obj.window.document.querySelectorAll('a')
    const urls = []
    for (const i of items){
        if (i.href[0] === '/'){
            i.href = baseURL + i.href
        }
        urls.push(i.href)
    }
    return urls
}

function normalizeURL(addr){
    const myURL = new URL(addr)
    const host_my = myURL.host
    let path_my = myURL.pathname
    if (path_my[path_my.length - 1] === '/'){
        path_my = path_my.slice(0,-1)
    }
    return host_my + path_my
}

async function crawlPage(baseURL, currentURL, pages=[]){
    try {
        if (!(new URL(currentURL).host === new URL(baseURL).host)){
            return pages
        }
        const normalizedCurrentURL = normalizeURL(currentURL)
        if (Object.hasOwn(pages, normalizedCurrentURL)){
            pages[normalizedCurrentURL]++
            return pages
        }else {
            if (!(normalizeURL(baseURL) === normalizeURL(currentURL))){
                pages[normalizedCurrentURL] = 1
            } else{
                pages[normalizedCurrentURL] = 0 
            }
        }
        const resp = await fetch(currentURL)
        if (resp.ok){
            if (resp.headers.get('content-type').split(';')[0] !== 'text/html') throw new Error('wrong content type, should be text/html')
            const text = await resp.text()
            const urls = getURLsFromHTML(text, baseURL)
            for (const u of urls){
                await crawlPage(baseURL, u, pages)
            }
            return pages
        } else {
            if (resp.status === 404) throw new Error("404, page not found")
            throw new Error(resp.status)
        }
    } catch(err){
        console.log("Error in crawling site.", err.message)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
