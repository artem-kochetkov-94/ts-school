interface IUserService {
  users: number;
  getUsersInDatabase(): number;
}

@setCreatedAt
class UserService implements IUserService {
  users: number = 1000;

  @Catch(false)
  getUsersInDatabase(): number {
    throw new Error("Error");
  }
}

function setCreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
  };
}

type CreatedAt = {
  createdAt: Date;
};

function Catch(rethrow: boolean) {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const method = descriptor.value;

    descriptor.value = (...args: any[]) => {
      try {
        return method?.apply(target, args);
      } catch (e: unknown) {
        console.log('e', e);
        if (rethrow) {
            throw e
        }
      }
    };

    return descriptor;
  };
}

const userService = new UserService() as IUserService & CreatedAt;
userService.getUsersInDatabase();

export {};
