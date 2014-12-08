# gourl
Open a url from a processes output, by default it'll wait for the first 100 lines or 2 seconds.

    some-process | gourl

Basically it'll open anything that in the stdout of the format `<http://example.com>`


## Install

    npm i -g git://github.com/orangemug/gourl.git


## Usage
Simple usage

    some-process | gourl

Optional args

 * `-n` number of lines to parse before bailing out
 * `-t` time in ms before bailing out

So this first example is as same as

    some-process | gourl -n 100 -t 2000


## License
MIT
