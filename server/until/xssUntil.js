module.exports= {
    /**
     * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
     * @param  { String } str 需要转义的字符串
     * @param  { RegExp } reg 自定义的正则
     * @return { String }     转义后的字符串
     */
    unhtmlForUrl: function (str, reg) {
        return str ? str.replace(reg || /[<">']/g, function (a) {
            return {
                '<': '&lt;',
                '&': '&amp;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            }[a]

        }) : '';
    },
    /**
     * 将str中的转义字符还原成html字符
     * @see UE.utils.unhtml(String);
     * @method html
     * @param { String } str 需要逆转义的字符串
     * @return { String } 逆转义后的字符串
     * @example
     * ```javascript
     *
     * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
     *
     * //output: <body>&</body>
     * console.log( UE.utils.html( str ) );
     *
     * ```
     */
    html: function (str) {
        return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;': '<',
                '&amp;': '&',
                '&quot;': '"',
                '&gt;': '>',
                '&#39;': "'",
                '&nbsp;': ' '
            }[m]
        }) : '';
    },
}