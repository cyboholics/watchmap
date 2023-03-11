from setuptools import setup, find_packages

setup(
    name='watchmap_sdk',
    version='0.1.0',
    description='A Python package to watch a directory and map its contents to a dictionary.',
    long_description=open('README.md').read(),
    author='Me',
    license='MIT',
    packages=find_packages(include=['watchmap_sdk']),
    setup_requires=['pytest-runner'],
    tests_require=['pytest'],
    test_suite='tests',
)