/*
 * Dateline 2.0.0
 * (c) 2019 Sjaak Priester, Amsterdam
 * MIT License
 * https://github.com/sjaakp/dateline
 * https://sjaakpriester.nl
 */

import {createDiv, setPixels, showElement} from "./utils";

export default function FocusRanges(content)
{
    this.content = content;
    this.band = content.band;
    this.widget = content.widget;
    this.element = createDiv('d-cursor', 'd-hidden');
    if (this.band.focusRange) {
        showElement(this.element);
    }
}

FocusRanges.prototype = {
    render: function()
    {   
        if (!this.band.focusRange) {
            return;
        }

        let beginDate = this.content.range.begin,
         endDate = this.content.range.end,
            start=this.band.focusRange.start(this.widget._cursor),
            stop=this.band.focusRange.stop(this.widget._cursor);
        
        if ((!this.band.focusRange.laststart || (this.band.focusRange.laststart != start.getTime())) ||
            (!this.band.focusRange.laststop || (this.band.focusRange.laststop != stop.getTime()))) {
                setPixels(this.element, 'left', this.band.calcPixels(start  - beginDate ));
                setPixels(this.element, 'right', this.band.calcPixels(endDate - stop ));
                this.band.focusRange.laststart = start.getTime();
                this.band.focusRange.laststop = stop.getTime();
            }
    }
};
