/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

/*global define, console*/
/*eslint no-use-before-define:0, no-console:0 */

define(function(require, exports, module) {

    // import dependencies
    require('./styles.css');
    var moment = require('moment/moment');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var DatePicker = require('famous-flex/widgets/DatePicker');

    function DateTimeExample(options) {
        View.apply(this, arguments);

        _createDatePicker.call(this);
        _createBack.call(this);
    }
    DateTimeExample.prototype = Object.create(View.prototype);
    DateTimeExample.prototype.constructor = DateTimeExample;

    function _createDatePicker() {
        this.datePicker = new DatePicker({
            date: new Date(),
            perspective: 500,
            wheelLayout: {
                itemSize: 50,
                diameter: 320,
                radialOpacity: -0.2
            },
            createRenderables: {
                top: true,
                bottom: true
            },
            classes: ['datetime']
        });
        this.datePicker.setComponents([
            new DatePicker.Component.FullDay({
                format: function(date) {
                    // format full date in current locale using momentjs
                    return moment(date).format('dd DD MMM');
                },
                sizeRatio: 2
            }),
            new DatePicker.Component.Hour(),
            new DatePicker.Component.Minute()
        ]);
        this.add(this.datePicker);
        return this.datePicker;
    }

    function _createBack() {
        this.back = new Surface({
            classes: ['datetime', 'background']
        });
        var mod = new Modifier({
            transform: Transform.translate(0, 0, -1000)
        });
        this.add(mod).add(this.back);
    }

    module.exports = DateTimeExample;
});
