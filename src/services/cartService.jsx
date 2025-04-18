import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  getDocs,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 장바구니에 이미 있는지 확인
const checkCartItemExist = async (cartId) => {
  const cartDocRef = doc(db, 'carts', cartId);
  const cartSnapshot = await getDoc(cartDocRef);
  return cartSnapshot.exists();
};

// 장바구니 항목 업데이트
const updateCartItem = async (cartItem, cartId) => {
  const cartDocRef = doc(db, 'carts', cartId);
  await updateDoc(cartDocRef, cartItem);
};

// 장바구니 항목 추가
const addNewCartItem = async (cartItem, cartId) => {
  const cartDocRef = doc(db, 'carts', cartId);
  await setDoc(cartDocRef, cartItem);
};

// 장바구니에 항목 추가 및 업데이트
export const addCartItem = async (cartItem) => {
  try {
    const cartId = `${cartItem.room_id}_${cartItem.user_id}`;
    const cartExists = await checkCartItemExist(cartId);

    if (cartExists) {
      await updateCartItem(cartItem, cartId);
    } else {
      await addNewCartItem(cartItem, cartId);
    }
  } catch (error) {
    console.error('장바구니 항목 추가 오류: ' + error.message);
  }
};

// 장바구니 데이터 조회
export const getCartItems = async (userId) => {
  if (!userId) return null;

  const q = query(collection(db, 'carts'), where('user_id', '==', userId));
  const cartSnapshot = await getDocs(q);

  const cartItems = await Promise.all(
    cartSnapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();

      const roomRef = doc(db, 'rooms', data.room_id);
      const roomSnap = await getDoc(roomRef);
      const roomData = roomSnap.exists() ? roomSnap.data() : null;

      let accomData = null;
      if (roomData) {
        const accomRef = doc(db, 'accommodations', roomData.accommodation_id);
        const accomSnap = await getDoc(accomRef);
        accomData = accomSnap.exists() ? accomSnap.data() : null;
      }

      return {
        id: docSnap.id,
        ...data,
        room: roomData,
        accom: accomData,
      };
    }),
  );

  return cartItems;
};

// 장바구니 항목 삭제
export const delCartItem = async (cartId) => {
  const cartRef = doc(db, 'carts', cartId);
  await deleteDoc(cartRef);
};

// room_id 기준으로 장바구니 항목 삭제
export const delCartItemOfroomId = async (roomId) => {
  const cartsCollection = collection(db, 'carts');

  const cartsQuery = query(cartsCollection, where('room_id', '==', roomId));
  const cartsSnapshot = await getDocs(cartsQuery);

  cartsSnapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, 'carts', docSnap.id));
  });
};
