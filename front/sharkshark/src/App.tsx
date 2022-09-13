import * as React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './views/LandingPage';
import { RecQuizPage } from './views/RecQuizPage';
import { RecUserPage } from './views/RecUserPage';
import { DataChartPage } from './views/DataChartPage';
import { Layout } from './views/Layout';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="home" element={<LandingPage />} />
        <Route path="recommend/quiz" element={<RecQuizPage />} />
        <Route path="recommend/user" element={<RecUserPage />} />
        <Route path="data/chart" element={<DataChartPage />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>
    </Routes>
  </ChakraProvider>
);
