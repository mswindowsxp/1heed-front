import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncateTextPipe implements PipeTransform {
    /**
     * use to truncate text form 0 to length
     * @param value
     * @param length
     * @return text truncated concate with elipse text
     */
    transform(value: string, length: number): string {
        const elipses = ' ...';
        if (!value) {
            return value;
        }
        if (value.length <= length) {
            return value;
        }
        // truncate to about correct lenght
        let truncatedText = value.slice(0, length);
        const charAtLengthPlusOne = value.slice(length, length + 1);
        if (/^[a-zA-Z]+$/.test(charAtLengthPlusOne)) {
            const lastIndexOfSpace = truncatedText.lastIndexOf(' ');
            if (lastIndexOfSpace > -1) {
                truncatedText = value.slice(0, lastIndexOfSpace);
            }
        }
        return truncatedText + elipses;
    }
}
