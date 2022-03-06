import React, { ReactComponentElement } from "react";
import { Modal, ModalBaseProps, StyleSheet, Text, View } from "react-native";

interface ModalProps extends ModalBaseProps {
  visible: boolean;
  transparent?: boolean;
  animationType: "none" | "slide" | "fade" | undefined;
  closeModal(): void;
  title?: string;
  text?: string;
  children: any
}

const ModalComponent = (props: ModalProps) => {
  const {
    visible,
    animationType = "none",
    transparent,
    closeModal,
    title,
    text,
    children,
  } = props;

  return (
    <View style={stylesModal.container}>
      <Modal
        visible={visible}
        animationType={animationType}
        transparent={transparent}
        onRequestClose={closeModal}
      >
        <View style={[stylesModal.modal, stylesModal.shadowProp]}>
          {children}
        </View>
      </Modal>
    </View>
  );
};

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "flex-end",
    //justifyContent: "flex-end",
    backgroundColor: "#C0C0C0",
  },
  modal: {
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 80,
    marginLeft: 40,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 190,
  }
});

export default ModalComponent;
