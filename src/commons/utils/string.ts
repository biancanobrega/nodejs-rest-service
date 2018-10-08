export default class StringUtil {
  public static arrayToString = (param: string[]): string => {
    return Array.isArray(param) ? param.toString().replace(',', ' ') : param;
  }
}
