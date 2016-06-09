# openurl
Open a url from a processes output, by default it'll wait for the first 100 lines or 2 seconds.

Basically it'll open anything from stdout of the format `<http://example.com>`.


## Usage
Just pipe something to it

    some-process | openurl



## Install

    npm install -g orangemug/openurl


## Usage
Simple usage

    some-process | openurl

Optional args

 * `-n --number` number of lines to parse before bailing out
 * `-t --timeout` time in ms before bailing out
 * `-m --multiple [number]` open multiple urls (defaults to 1)
 * `-i --interval [interval]` used with multiple as the interval in ms between open calls (defaults to `1000`)

So this first example is as same as

    some-process | openurl -n 100 -t 2000

If you have a markdown file with a load of urls you want to open, the following will open them one every second (in order to not hammer the poor website)

    cat urls.md | openurl -m 20 -i 1000


## License
[MIT](LICENSE)
