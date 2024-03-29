import { atOrFist } from "../../../utils";
import * as fieldUtils from "../../../utils/fields-utils";

export const headerContentResolver = ({
  logoSource,
  email,
  phone,
  callbackLink,
  menu,
  callbackButtonName,
  defaultContent,
  env,
  menuList,
  ...rest
}) => ({
  logoSource: fieldUtils.resolveField(
    fieldUtils.getSourceFile(logoSource.value[0], env, "path"),
    defaultContent.logoSource
  ),
  email: fieldUtils.resolveField(email.value, defaultContent.email),
  phone: fieldUtils.resolveField(phone.value, defaultContent.phone),
  callbackLink: fieldUtils.resolveField(
    callbackLink.value,
    defaultContent.callbackLink
  ),
  menu: fieldUtils.resolveField(menu.value, defaultContent.menu),
  callbackButtonName: fieldUtils.resolveField(
    callbackButtonName.value,
    defaultContent.callbackButtonName
  ),
  menuList: fieldUtils.resolveField(
    menuList.data.map(({ custom_fields, _id }, index) => ({
      _id,
      title: fieldUtils.resolveField(
        custom_fields.title.value,
        atOrFist(defaultContent.menuList, index).title
      ),
      link: fieldUtils.resolveField(
        custom_fields.link.value,
        atOrFist(defaultContent.menuList, index).link
      ),
    })),
    defaultContent.menuList
  ),
  ...rest,
});
