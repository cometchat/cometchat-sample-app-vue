import { CometChat } from "@cometchat-pro/chat";
import { logger } from "../util/common";

/**
 * CometChatManager class encapsulates the following functionality:
 * - getting logged in user
 * - blocks a list of users
 * - unblocks a list of users
 * - initiate a call
 * - accept a call
 * - reject a call
 */
export class CometChatManager {
  loggedInUser;
  isUserLoggedIn;

  /**
   * Gets the current logged in user
   */
  getLoggedInUser() {
    let timerCounter = 10000;
    let timer = 0;

    return new Promise((resolve, reject) => {
      if (timerCounter === timer) reject(`timer reached ${timerCounter}`);

      if (this.loggedInUser) resolve(this.loggedInUser);

      if (!CometChat.isInitialized()) reject("CometChat not initialized");

      this.isUserLoggedIn = setInterval(() => {
        CometChat.getLoggedinUser().then(
          (user) => {
            this.loggedInUser = user;
            clearInterval(this.isUserLoggedIn);
            resolve(user);
          },
          (error) => {
            logger("error", error);
            reject(error);
          }
        );

        timer += 100;
      }, 100);
    });
  }

  /**
   * Blocks a list of users
   * @param {*} userList
   */
  static blockUsers = (userList) => {
    return new Promise((resolve, reject) => {
      CometChat.blockUsers(userList).then(
        (list) => resolve(list),
        (error) => reject(error)
      );
    });
  };

  /**
   * Unblocks a list of users
   * @param {*} userList
   */
  static unblockUsers = (userList) => {
    return new Promise((resolve, reject) => {
      CometChat.unblockUsers(userList).then(
        (list) => resolve(list),
        (error) => reject(error)
      );
    });
  };

  /**
   * Initiates a call
   * @param {*} receiverID
   * @param {*} receiverType
   * @param {*} callType
   */
  static call = (receiverID, receiverType, callType) => {
    return new Promise((resolve, reject) => {
      const call = new CometChat.Call(receiverID, callType, receiverType);
      CometChat.initiateCall(call).then(
        (call) => resolve(call),
        (error) => reject(error)
      );
    });
  };

  /**
   * Initiates an audio call
   * @param {*} receiverID
   * @param {*} receiverType
   * @param {*} callType
   */
  static audioCall = (receiverID, receiverType, callType) => {
    return new Promise((resolve, reject) => {
      const call = new CometChat.Call(receiverID, callType, receiverType);
      CometChat.initiateCall(call).then(
        (call) => resolve(call),
        (error) => reject(error)
      );
    });
  };

  /**
   * Accept a call
   * @param {*} sessionId
   */
  static acceptCall = (sessionId) => {
    return new Promise((resolve, reject) => {
      CometChat.acceptCall(sessionId).then(
        (call) => resolve(call),
        (error) => reject(error)
      );
    });
  };

  /**
   * Reject a call
   * @param {*} sessionId
   * @param {*} rejectStatus
   */
  static rejectCall = (sessionId, rejectStatus) => {
    return new Promise((resolve, reject) => {
      CometChat.rejectCall(sessionId, rejectStatus).then(
        (call) => resolve(call),
        (error) => reject(error)
      );
    });
  };
}

export default CometChatManager;
