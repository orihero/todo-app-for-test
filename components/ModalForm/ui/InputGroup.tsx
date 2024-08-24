import { Spacing } from "@/components/Spacing";
import { COLORS } from "@/constants/colors";
import { normalizeHeight } from "@/constants/dimensions";
import { FontFamily } from "@/constants/fonts";
import { memo } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useModalForm } from "../useModalForm";

function InputGroup() {
  const { description, title, onChangeDescription, onChangeTitle } =
    useModalForm();
  return (
    <>
      <TextInput
        placeholder="Title"
        placeholderTextColor={COLORS.stone}
        style={[styles.baseText, styles.textInput]}
        autoCapitalize="none"
        autoCorrect={false}
        value={title}
        onChangeText={onChangeTitle}
      />
      <Spacing height={11} />
      <TextInput
        placeholder="Description"
        placeholderTextColor={COLORS.stone}
        style={[styles.baseText, styles.textInput, styles.textArea]}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={onChangeDescription}
      />
    </>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: normalizeHeight(16),
    fontFamily: FontFamily.LexendDeca_400Regular,
  },
  textInput: {
    color: COLORS.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.softLilac,
    width: "100%",
  },
  textArea: {
    height: normalizeHeight(250),
  },
});

export default memo(InputGroup);
