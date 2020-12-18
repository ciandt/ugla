export class CodeName {
  public code: number;
  public name: string;

  static fromJSON(objs?: any[]): CodeName[] {
    const results: CodeName[] = [];
    for (let index = 0; index < objs.length; index++) {
      results.push(new CodeName(objs[index].code, objs[index].name));
    }

    return results;
  }

  constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
  }
}
