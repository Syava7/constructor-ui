import {
  getSourceFile,
  resolveField,
  resolveFieldMobile,
} from "../../../utils/fields-utils";

export const welcomeSliderContentResolver = ({
  items,
  env,
  defaultContent,
}) => {
  return {
    items: resolveField(
      items.data.map(({ custom_fields, _id }, index) => {
        const photoSource = getSourceFile(
          custom_fields.photoSource.value[0],
          env
        );
        return {
          photoSource: resolveField(
            photoSource,
            defaultContent.items[index].photoSource
          ),
          photoSourceMobile: resolveFieldMobile(
            getSourceFile(custom_fields.photoSource.value[0], env),
            photoSource,
            defaultContent.items[index].photoSourceMobile
          ),
          buttonName: resolveField(
            custom_fields.buttonName.value,
            defaultContent.items[index].buttonName
          ),
          buttonLink: resolveField(
            custom_fields.buttonLink.value,
            defaultContent.items[index].buttonLink
          ),
          _id,
        };
      }),
      defaultContent.items
    ),
  };
};
