import {
  Azuki,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer
 } from "../generated/Azuki/Azuki"
 
 import {
  Token, User
 } from '../generated/schema' 



export function handleApproval(event: Transfer): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.createdAtTimestamp = event.block.timestamp;
    
    let tokenContract = Azuki.bind(event.address);
    token.contentURI = tokenContract.tokenURI(event.params.tokenId);
  }
  token.owner = event.params.to.toHexString();
  token.save();
 
  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}

