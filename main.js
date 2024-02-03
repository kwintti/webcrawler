const { argv } = require('node:process')
const { crawlPage } = require('./crawl')
const { printReport } = require('./report')

async function main(){
    try {
        if (argv.length < 3){
            throw new Error("One argument is needed, you have none.")
        }
        if (argv.length > 3){
            throw new Error("Only one argument is needed, you have many.")
        }
        console.log("Crawler starting working at: ", argv[2])
        const crawledPages = await crawlPage(argv[2], argv[2])
        printReport(crawledPages)
        
    } catch (err) {
        console.log(err.message)
    }
}

main()
