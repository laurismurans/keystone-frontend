const objectToQueryParams = (obj: Record<any, any>): string => {
  return Object.keys(obj).reduce((accumulator, current) => {
    const param = obj[current as keyof Record<string, unknown>];
    if (Array.isArray(param)) {
      return (
        accumulator +
        param.reduce((acc, curr) => {
          return `${acc}${current}=${curr}&`;
        }, "")
      );
    }

    if (typeof param == "object" && !(param instanceof Date)) {
      return accumulator + objectToQueryParams(param);
    }

    if (param == undefined) {
      return accumulator;
    }

    return accumulator + `${current}=${param}&`;
  }, "");
};

export default objectToQueryParams;
