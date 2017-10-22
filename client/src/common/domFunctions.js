const DOMFunctions = {

  removeBook: function(bookID) {
    let list = document.getElementById("book-list");
    let book = document.getElementById("book-" + bookID);
    list.removeChild(book);
  },

  updateRequestBtn: function(count) {
    let requestBtn = document.getElementById("request-btn");
    requestBtn.innerHTML = "My Request Books (" + count + ")";
  },

  updateApprovalBtn: function(count) {
    let approvalBtn = document.getElementById("approval-btn");
    approvalBtn.innerHTML = "Pending My Approvals (" + count + ")";
  }

}

export default DOMFunctions;
