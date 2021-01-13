<template>
  <div>
    <comet-chat-backdrop :show="open" @click="closeModal" />
    <div :style="styles.modalWrapper" class="modal__createpoll__wrapper">
      <span :style="styles.modalClose" @click="closeModal"></span>
      <div :style="styles.modalBody">
        <table :style="styles.modalTable" class="modal__createpoll__table">
          <caption :style="styles.tableCaption">
            {{
              CONSTANTS.CREATE_POLL
            }}
          </caption>
          <tbody
            :style="styles.tableBody"
            class="modal__createpoll__table__body"
          >
            <tr :style="styles.modalTableRow">
              <td colSpan="3">
                <div :style="styles.modalError">{{ error }}</div>
              </td>
            </tr>
            <tr :style="styles.modalTableRow">
              <td>
                <label>{{ CONSTANTS.QUESTION }}</label>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  autoFocus
                  tabIndex="1"
                  v-model="question"
                  :style="styles.input"
                  :placeholder="CONSTANTS.ENTER_YOUR_QUESTION"
                />
              </td>
            </tr>
            <tr :style="styles.modalTableRow">
              <td>
                <label>{{ CONSTANTS.OPTIONS }}</label>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  tabIndex="1"
                  :style="styles.input"
                  v-model="firstOption"
                  :placeholder="CONSTANTS.ENTER_YOUR_OPTION"
                />
              </td>
            </tr>
            <tr ref="optionRef" :style="styles.modalTableRow">
              <td>&nbsp;</td>
              <td colSpan="2">
                <input
                  type="text"
                  tabIndex="1"
                  :style="styles.input"
                  v-model="secondOption"
                  :placeholder="CONSTANTS.ENTER_YOUR_OPTION"
                />
              </td>
            </tr>
            <comet-chat-create-poll-options
              :key="i"
              :option="option"
              :input-styles="styles.input"
              :styles="styles.modalTableRow"
              v-for="(option, i) in options"
              @remove="removePollOption"
              @change="optionChangeHandler"
            />
            <tr :style="styles.modalTableRow" s>
              <td>&nbsp;</td>
              <td>
                <label>{{ CONSTANTS.ADD_NEW_OPTION }}</label>
              </td>
              <td :style="styles.iconWrapper">
                <span
                  :style="styles.addOptionIcon"
                  @click="addPollOption"
                ></span>
              </td>
            </tr>
          </tbody>

          <tfoot :style="{ display: 'inline-block' }">
            <tr :style="{ border: 'none' }">
              <td :style="{ textAlign: 'center' }" colSpan="2">
                <button
                  :disabled="creatingPoll"
                  :style="styles.button"
                  @click="createPoll"
                >
                  {{ actionButtonText }}
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
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../../resources/constants";

import { cometChatCommon } from "../../../../mixins/";

import { CometChatManager } from "../../../../util/controller";

import { CometChatBackdrop } from "../../../Shared";
import CometChatCreatePollOptions from "../CometChatCreatePollOptions/CometChatCreatePollOptions";

import * as style from "./style";

import addIcon from "./resources/add.png";
import clearIcon from "./resources/close.png";

export default {
  name: "CometChatCreatePoll",
  mixins: [cometChatCommon],
  components: {
    CometChatBackdrop,
    CometChatCreatePollOptions,
  },
  props: {
    item: { ...DEFAULT_OBJECT_PROP },
    type: { ...DEFAULT_STRING_PROP },
    open: { ...DEFAULT_BOOLEAN_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      error: "",
      options: [],
      question: "",
      firstOption: "",
      secondOption: "",
      loggedInUser: {},
      creatingPoll: false,
      pollOptionView: null,
    };
  },
  computed: {
    styles() {
      return {
        input: style.inputStyle(),
        modalBody: style.modalBodyStyle(),
        tableBody: style.tableBodyStyle(),
        tableFoot: style.tableFootStyle(),
        modalError: style.modalErrorStyle(),
        modalTable: style.modalTableStyle(),
        iconWrapper: style.iconWrapperStyle(),
        tableCaption: style.tableCaptionStyle(),
        modalClose: style.modalCloseStyle(clearIcon),
        addOptionIcon: style.addOptionIconStyle(addIcon),
        modalTableRow: style.modalTableRowStyle(this.theme),
        button: style.buttonStyle(this.theme, this.creatingPoll),
        modalWrapper: style.modalWrapperStyle(this.theme, this.open),
      };
    },
    actionButtonText() {
      return this.creatingPoll
        ? STRING_MESSAGES.CREATING_MESSSAGE
        : STRING_MESSAGES.CREATE;
    },
    CONSTANTS() {
      return STRING_MESSAGES;
    },
  },
  methods: {
    closeModal() {
      this.error = "";
      this.options = [];
      this.question = "";
      this.firstOption = "";
      this.secondOption = "";

      this.emitEvent("close");
    },
    optionChangeHandler({ event, option }) {
      const options = [...this.options];
      const optionKey = options.findIndex((opt) => opt.id === option.id);

      if (optionKey > -1) {
        const newOption = { ...option, value: event.target.value };

        options.splice(optionKey, 1, newOption);

        this.options = options;
      }
    },
    async createPoll() {
      this.creatingPoll = true;

      const question = (this.question || "").trim();
      const firstOption = (this.firstOption || "").trim();
      const secondOption = (this.secondOption || "").trim();

      const optionItems = [firstOption, secondOption];
      let invalid = false;

      if (question.length === 0) {
        this.error = STRING_MESSAGES.POLL_QUESTION_BLANK;
        this.creatingPoll = false;
        return false;
      }

      if (firstOption.length === 0 || secondOption.length === 0) {
        invalid = true;
      }

      this.options.forEach((option) => {
        const value = (option.value || "").trim();

        if (!value) {
          invalid = true;
        }

        optionItems.push(value);
      });

      if (invalid) {
        this.error = STRING_MESSAGES.POLL_OPTION_BLANK;
        this.creatingPoll = false;
        return false;
      }

      let receiverId;
      let receiverType = this.type;

      if (this.type === "user") {
        receiverId = this.item.uid;
      } else if (this.type === "group") {
        receiverId = this.item.guid;
      }

      try {
        const response = await CometChat.callExtension(
          "polls",
          "POST",
          "v1/create",
          {
            question,
            options: optionItems,
            receiver: receiverId,
            receiverType: receiverType,
          }
        );

        const data = response.message.data;
        const customData = data.data.customData;
        const options = customData.options;

        const resultOptions = {};
        for (const option in options) {
          resultOptions[option] = {
            text: options[option],
            count: 0,
          };
        }

        const polls = {
          id: data.id,
          options: options,
          results: {
            total: 0,
            options: resultOptions,
            question: customData.question,
          },
          question: customData.question,
        };

        const message = {
          ...data,
          sender: { uid: data.sender },
          metadata: { "@injected": { extensions: { polls: polls } } },
        };

        this.error = "";
        this.emitAction("pollCreated", { message });
      } catch (error) {
        console.log("error", error);
        this.error = error.message || error;
      } finally {
        this.creatingPoll = false;
      }
    },
    addPollOption() {
      const options = [...this.options];
      options.push({ value: "", id: new Date().getTime() });

      this.options = options;
    },
    removePollOption(option) {
      const options = [...this.options];
      const optionKey = options.findIndex((opt) => opt.id === option.id);
      if (optionKey > -1) {
        options.splice(optionKey, 1);

        this.options = options;
      }
    },
  },
  beforeMount() {
    (async () => {
      try {
        this.loggedInUser = await new CometChatManager().getLoggedInUser();
      } catch (error) {
        console.error("[CometChatCreatePoll] getLoggedInUser error", error);
      }
    })();
  },
};
</script>
<style>
.modal__createpoll__table tr {
  width: 100%;
  display: table;
  table-layout: fixed;
}

.modal__createpoll__table__body td {
  padding: 6px 12px;
  font-size: 14px;
}
.modal__createpoll__table__body tr td:first-of-type {
  width: 90px;
}
.modal__createpoll__table__body label {
  padding: 6px 12px;
}
.modal__createpoll__table input:focus {
  outline: none !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .modal__createpoll__wrapper {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>