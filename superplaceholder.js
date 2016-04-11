var Vue = require('vue');

module.exports = Vue.directive('superplaceholder', function(placeholders){
    var input = this.el;
    var self = this;
    self.timeouts = [];
    self.originalPlaceholder = input.placeholder;

    input.addEventListener('focus', function(){
        if(placeholders instanceof Array){
            type(placeholders[0], 0, placeholders, 0)
        } else {
            type(placeholders, 0)
        }
    })

    input.addEventListener('blur', function(){
        self.timeouts.forEach(function(timeout){
            clearTimeout(timeout)
        })
        self.timeouts.lenght = 0;
        input.placeholder = self.originalPlaceholder;
    })

    function type(word, position, listOfWords, indexOfWord){
        var newTimeout = setTimeout(function(){
            if(position <= word.length){
                input.placeholder = word.substr(0, position) + (position === word.length?'':'|');
                position++;
                type(word, position, listOfWords, indexOfWord);
            } else if( listOfWords && indexOfWord < listOfWords.length){
                indexOfWord++;
                newtimeout = setTimeout(function(){
                    type(listOfWords[indexOfWord], 0, listOfWords, indexOfWord);
                }, 400)
                self.timeouts.push(newTimeout);
            }
        }, 100)
        self.timeouts.push(newTimeout);
    }
})
