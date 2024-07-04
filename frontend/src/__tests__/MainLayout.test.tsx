import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainLayout } from '../layout/MainLayout';

describe('MainLayout', () => {
  test('debería renderizar el componente MainLayout', () => {
    render(
      <MainLayout>
        <p>Children</p>
      </MainLayout>
    );
    expect(screen.getByText('TODO LIST')).toBeDefined();
  });
});
