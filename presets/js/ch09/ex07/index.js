class Animal {
  eat() {}
  makeSound() {}
}

class Dog extends Animal {
  bite() {}
}
// eslint-disable-next-line
class Husky extends Dog {}
// eslint-disable-next-line
class Cat extends Animal {
  scratch() {}
}
// eslint-disable-next-line
class Bird extends Animal {
  fly() {}
}

// FishはAnimalクラスのmakeSound()が不要なので継承のかわりに合成を行う
// eat()だけ使いたいので、インスタンスメソッドを定義して、Animalオブジェクトに処理を委譲する
// eslint-disable-next-line
class Fish {
  constructor() {
    this.amimal = new Animal();
  }
  eat() {
    return this.amimal.eat();
  }
  swim() {}
}
