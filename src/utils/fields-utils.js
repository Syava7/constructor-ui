export const baseResolver = ({ field }) => {
  return field.value;
};

export const getSingleFileSourceWithType = (singleFileWithType, SITE_URL) => {
  return `${SITE_URL}${singleFileWithType.replace("./", "/")}`;
};

export const getSingleFileSource = (
  singleFile,
  type = "compression",
  SITE_URL
) => {
  return getSingleFileSourceWithType(singleFile[type], SITE_URL);
};

/** @param {{type: "compression" | "preview" | "path" | undefined, field: object, isArray: boolean | undefined, env: {SITE_URL: string}}} params */
export const fileResolver = ({
  field,
  isArray = false,
  type = "compression",
  env,
}) => {
  const { SITE_URL } = env;
  if (!Array.isArray(field)) return getSingleFileSource(field, type, SITE_URL);
  if (!isArray) return getSingleFileSource(field[0], type, SITE_URL);

  return field.map(({ _id, ...singleFile }) => ({
    _id,
    source: getSingleFileSource(singleFile, type, SITE_URL),
  }));
};

export const repeatx1Resolver = ({ field, keyResolvers }) => {
  return field.data.map(({ _id, custom_fields: currentFields }) =>
    Object.keys(currentFields).reduce(
      (acc, fieldKey) => ({
        ...acc,
        [fieldKey]: keyResolvers[fieldKey].resolver({
          field: currentFields[fieldKey],
          ...keyResolvers[fieldKey],
        }),
      }),
      {
        _id,
      }
    )
  );
};
