<template>
  <div>
    <comet-chat-backdrop :show="open" @click="closeModal" />
    <div :style="styles.modalWrapper" class="modal__creategroup__wrapper">
      <span :style="styles.modalClose" @click="closeModal"></span>
      <div :style="styles.modalBody">
        <table class="modal__creategroup__table" :style="styles.modalTable">
          <caption :style="styles.caption">
            {{
              STRINGS.CREATE_GROUP
            }}
          </caption>
          <tbody
            :style="styles.tableBody"
            class="modal__creategroup__table__body"
          >
            <tr class="error">
              <td>
                <div :style="styles.tableError">
                  {{ error }}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  tabIndex="1"
                  v-model="name"
                  autocomplete="off"
                  placeholder="Enter group name"
                  :style="styles.input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <select tabIndex="2" v-model="type" :style="styles.input">
                  <option value="">{{ STRINGS.SELECT_GROUP_TYPE }}</option>
                  <option value="public">{{ STRINGS.PUBLIC }}</option>
                  <option value="private">{{ STRINGS.PRIVATE }}</option>
                  <option value="protected">
                    {{ STRINGS.PASSWORD_PROTECTED }}
                  </option>
                </select>
              </td>
            </tr>
            <tr v-if="isPasswordInput">
              <td>
                <input
                  tabIndex="3"
                  type="password"
                  autoComplete="off"
                  v-model="password"
                  :style="styles.input"
                  :placeholder="STRINGS.ENTER_GROUP_PASSWORD"
                />
              </td>
            </tr>
          </tbody>
          <tfoot :style="{ display: 'inline-block' }">
            <tr :style="{ border: 'none' }">
              <td :style="{ textAlign: 'center' }">
                <button
                  tabIndex="4"
                  :disabled="creatingGroup"
                  @click="createGroupHandler"
                  :style="styles.tableButton"
                >
                  {{
                    creatingGroup ? STRINGS.CREATING_MESSSAGE : STRINGS.CREATE
                  }}
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";
import { cometChatCommon } from "../../../mixins";

import { CometChatBackdrop } from "../../Shared";

import closeIcon from "./resources/close.png";

import * as style from "./style";

/**
 * Modal used to create a group.
 *
 * @displayName CometChatCreateGroup
 */
export default {
  name: "CometChatCreateGroup",
  mixins: [cometChatCommon],
  components: {
    CometChatBackdrop,
  },
  props: {
    /**
     * Opens the modal.
     */
    open: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      name: "",
      type: "",
      error: null,
      password: "",
      creatingGroup: false,
      isPasswordInput: false,
    };
  },
  computed: {
    /**
     * Computed group name.
     */
    groupName() {
      return this.name.trim();
    },
    /**
     * Computed group type.
     */
    groupType() {
      return this.type.trim();
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        modalBody: style.modalBodyStyle(),
        tableBody: style.tableBodyStyle(),
        caption: style.tableCaptionStyle(),
        modalTable: style.modalTableStyle(),
        tableError: style.tableErrorStyle(),
        input: style.inputStyle(this.theme),
        modalClose: style.modalCloseStyle(closeIcon),
        tableButton: style.tableButtonStyle(this.theme),
        modalWrapper: style.modalWrapperStyle(this.theme, this.open),
      };
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
  watch: {
    /**
     * Toggles isPasswordInput on value change
     */
    type: {
      handler(value) {
        this.isPasswordInput = value === "protected";
      },
    },
  },
  methods: {
    /**
     * Handles group creation
     */
    async createGroupHandler() {
      try {
        if (!this.validate()) {
          return false;
        }

        this.creatingGroup = true;

        const name = this.groupName;
        const password = this.password;
        const guid = "group_" + new Date().getTime();

        let type = CometChat.GROUP_TYPE.PUBLIC;

        switch (this.groupType) {
          case "public":
            type = CometChat.GROUP_TYPE.PUBLIC;
            break;
          case "private":
            type = CometChat.GROUP_TYPE.PRIVATE;
            break;
          case "protected":
            type = CometChat.GROUP_TYPE.PASSWORD;
            break;
          default:
            break;
        }

        const group = new CometChat.Group(guid, name, type, password);

        try {
          const createdGroup = await CometChat.createGroup(group);
          this.logError("Group created successfully:", createdGroup);

          this.clearForm();

          this.emitAction("groupCreated", { group: createdGroup });
        } catch (error) {
          this.logError("Group creation failed with exception:", error);
          this.error = error;
        } finally {
          this.creatingGroup = false;
        }
      } catch (error) {
        this.logError("Group creation failed with exception:", error);
      }
    },
    /**
     * Validates input
     */
    validate() {
      if (!this.groupName) {
        this.error = COMETCHAT_CONSTANTS.GROUP_NAME_BLANK;
        return false;
      }

      if (!this.groupType) {
        this.error = COMETCHAT_CONSTANTS.GROUP_TYPE_BLANK;
        return false;
      }

      let password = "";
      if (this.groupType === "protected") {
        password = this.password;

        if (!password.length) {
          this.error = COMETCHAT_CONSTANTS.GROUP_PASSWORD_BLANK;
          return false;
        }
      }
      return true;
    },
    /**
     * Closes modal
     */
    closeModal() {
      this.emitEvent("close");
    },
    /**
     * Clears form
     */
    clearForm() {
      this.error = null;
      this.name = "";
      this.type = "";
      this.password = "";
      this.isPasswordInput = false;
    },
  },
};
</script>
<style scoped>
.modal__creategroup__table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.modal__creategroup__table__body td {
  padding: 8px 0px;
  font-size: 14px;
}
.modal__creategroup__table__body input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px 14px !important;
}
.modal__creategroup__table__body select {
  outline: none;
  padding: 10px !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .modal__creategroup__wrapper {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>