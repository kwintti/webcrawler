function printReport(pages){
    console.log("Crawling report")
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1])
    for (const v of sortedPages){
        console.log(`Found ${v[1]} internal links to ${v[0]}`)
    }
}

module.exports = {
    printReport
}
