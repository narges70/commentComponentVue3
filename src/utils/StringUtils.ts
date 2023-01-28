
class StringUtils {

    static avatarText(name: string): string {
        let text:string = '';
        let textArray = name.split(' ');
        if (textArray && textArray.length>0) {
            textArray.forEach(value => {
                text += value.charAt(0);
            })
        }
        return text;
    }
}
export default StringUtils