const {test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('https://blog.boot.dev/path/ --> blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})
test('http://blog.boot.dev/path/ --> blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})
test('http://blog.boot.dev/path --> blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})
test('https://blog.boot.dev/path --> blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})
test('testing urls from html', () => {
    expect(getURLsFromHTML(`
<html>
    <body>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/hello.html"><span>Go to Boot.dev</span></a>
    </body>
</html>
`, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/', 'https://blog.boot.dev/', 'https://blog.boot.dev/', 'https://blog.boot.dev/hello.html'])
})
