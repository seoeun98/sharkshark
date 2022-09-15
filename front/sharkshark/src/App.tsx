import * as React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './views/LandingPage';
import { RecQuizPage } from './views/RecQuizPage';
import { RecUserPage } from './views/RecUserPage';
import { DataChartPage } from './views/DataChartPage';
import { Layout } from './views/Layout';
import { CodeTestPage } from './views/CodeTestPage';
import { BloggingPage } from './views/BloggingPage';
import { DataRivalPage } from './views/DataRivalPage';
import { DataRoadPage } from './views/DataRoadPage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="home" element={<LandingPage />} />
        <Route path="recommend/quiz" element={<RecQuizPage />} />
        <Route path="recommend/user" element={<RecUserPage />} />
        <Route path="codingtest" element={<CodeTestPage />} />
        <Route path="blogging" element={<BloggingPage />} />
        <Route path="data/chart" element={<DataChartPage />} />
        <Route path="data/road" element={<DataRoadPage />} />
        <Route path="data/rival" element={<DataRivalPage />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>
    </Routes>
  </ChakraProvider>
);
