function LogParameter(target: any, methodName: string, parameterIndex: number) {
    console.log(`Parameter decorator called on: 
      target: ${target.constructor.name},
      methodName: ${methodName},
      parameterIndex: ${parameterIndex}`);
}


class MyClass {
    greet(@LogParameter message: string) {
        console.log(message);
    }
}

(new MyClass()).greet("hello")