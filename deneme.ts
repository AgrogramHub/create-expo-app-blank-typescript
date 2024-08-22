class Deneme {
  private a: number;

  constructor(a: number) {
    this.a = a;
  }

  public b(): number {
    return this.a;
  }

  public c(): void {
    console.log('c');
  }
}

export default Deneme;
