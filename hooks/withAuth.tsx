import { COLORS } from "@/constants/colors";
import { FontFamily } from "@/constants/fonts";
import { HIT_SLOP } from "@/constants/styles";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, FC } from "react";
import { useAuthMutation } from "@/store/services/features/TodoApi";
import { DEBUG } from "@/constants/global";
import { selectTokens, setTokens, setUser } from "@/store/LocalStore";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Higher Order Component for Authentication
export const withAuth = (Component: FC) => {
  const WrappedComponent: FC = () => {
    const [authApi, { data, isSuccess }] = useAuthMutation();
    const dispatch = useAppDispatch();
    const storedTokens = useAppSelector(selectTokens);

    // Animation function for layout changes
    const makeLayoutAnimation = useCallback(() => {
      LayoutAnimation.easeInEaseOut();
    }, []);

    // Function to initiate authentication
    const goTodo = useCallback(async () => {
      try {
        await authApi();
      } catch (err) {
        if (DEBUG) console.error("Authentication error:", err);
      }
    }, [authApi]);

    // Effect to handle actions on successful authentication
    useEffect(() => {
      if (isSuccess && data) {
        makeLayoutAnimation();
        dispatch(
          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        dispatch(setUser(data.user));
      }
    }, [isSuccess, data, dispatch, makeLayoutAnimation]);

    // Render the wrapped component if authentication tokens are present
    if (storedTokens?.accessToken) {
      return <Component />;
    }

    // Render the authentication button if the user is not authenticated
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          hitSlop={HIT_SLOP}
          onPress={goTodo}
        >
          <Text style={styles.buttonText}>GO TODO</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return WrappedComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purple,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FontFamily.LexendDeca_500Medium,
    color: COLORS.white,
  },
});
