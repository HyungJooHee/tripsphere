import { useMutation } from '@tanstack/react-query';
import { saveUserInfo, signInUser, signupUser } from '../services/authService';
import useAuthStore from '../stores/useAuthStore';

// 이메일 & 비밀번호
export const useSignupMutation = (showToast) => {
  return useMutation({
    mutationFn: (userData) => signupUser({ ...userData, showToast }),
    onSuccess: (user) => {
      console.log('회원가입 성공:', user);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error.message);
    },
  });
};

// 유저 정보 저장
export const useSaveUserInfo = (onNext) => {
  return useMutation({
    mutationFn: saveUserInfo,
    onSuccess: (user) => {
      console.log('정보 저장 성공: ' + JSON.stringify(user));
      onNext();
    },
    onError: (error) => {
      console.log('정보 저장 실패: ' + error);
    },
  });
};

// 로그인
export const useSignInMutation = (state, dispatch, showModal, navigate) => {
  return useMutation({
    mutationFn: () =>
      signInUser({ email: state.email, password: state.password, dispatch }),
    onSuccess: async (user) => {
      const userData = {
        email: user.email,
        uid: user.uid,
        token: await user.getIdToken(),
      };

      useAuthStore.getState().login(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      showModal('success', '', '로그인 성공');
      navigate('/');
    },
    onError: (error) => {
      let errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';

      if (error.message === '유효성 검사 실패') return;
      if (error.code === 'auth/user-not-found')
        errorMessage = '일치하는 회원정보가 없습니다.';
      if (error.code === 'auth/wrong-password')
        errorMessage = '비밀번호가 일치하지 않습니다.';

      showModal('error', '로그인 실패', errorMessage);
    },
  });
};
