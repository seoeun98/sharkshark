import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './views/LandingPage';
import { RecQuizPage } from './views/RecQuizPage';
import { RecUserPage } from './views/RecUserPage';
import { DataChartMainPage } from './views/DataChartMainPage';
import { Layout } from './views/Layout';
import { CodeTestPage } from './views/CodeTestPage';
import { BloggingPage } from './views/BloggingPage';
import { UserLoginPage } from './views/UserLoginPage';
import { UserRegisterPage } from './views/UserRegisterPage';
import { ResetPasswordPage } from './views/ResetPasswordPage';
import { ModifyPasswordPage } from './views/ModifyPasswordPage';
import customTheme from './theme/index';

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="home" element={<LandingPage />} />
        <Route path="recommend/quiz" element={<RecQuizPage />} />
        <Route path="recommend/user" element={<RecUserPage />} />
        <Route path="codingtest" element={<CodeTestPage />} />
        <Route path="blogging" element={<BloggingPage />} />
        <Route path="data/chart" element={<DataChartMainPage />} />
        <Route path="setting" element={<ModifyPasswordPage />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>
      <Route path="login" element={<UserLoginPage />} />
      <Route path="password-reset" element={<ResetPasswordPage />} />
      <Route path="register" element={<UserRegisterPage />} />
    </Routes>
  </ChakraProvider>
);
